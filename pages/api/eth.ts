// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ResponseData } from "@/types";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

const baseUrl = "https://etherscan.io";

enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

function getTokenTypeIndex(tokenType: string) {
  switch (tokenType.toUpperCase()) {
    case TokenType.ERC20:
      return 0;
    case TokenType.ERC721:
      return 2;
    case TokenType.ERC1155:
      return 3;
    default:
      return 0;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<ResponseData>>
) {
  const address = req.query.address as string;
  const tokenType = req.query.tokenType as string;

  const axiosResponse = await axios.request({
    url: `${baseUrl}/tokenapprovalchecker?type=${getTokenTypeIndex(
      tokenType
    )}&search=${address}`,
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  const $ = cheerio.load(axiosResponse.data);

  let response = $("tbody > tr")
    .toArray()
    .map((e) => ({
      transactionHash: $(e).find("td:first > a").text().trim(),
      lastUpdated: $(e).find("td:nth-child(2n) > span.showDate").text(),
      assetName: $(e).find("td:nth-child(3n) > a").text().trim(),
      assetAddress: $(e)
        ?.find("td:nth-child(3n) > a")
        ?.attr("href")
        ?.split("/")[2],
      assetIcon: baseUrl + $(e).find("td:nth-child(3n) > a > img").attr("src"),
      approvedSpenderName: $(e)
        .find("td:nth-child(4n) > div > a")
        .text()
        .trim(),
      approvedSpenderAddress: $(e)
        .find("td:nth-child(4n) > div > a")
        .attr("href")
        ?.split("/")[2],
      allowance: {
        value: $(e)
          .find("td:nth-child(5n)")
          .text()
          .trim()
          .split($(e).find("td:nth-child(5n) > a").text())[0],
        symbol: $(e).find("td:nth-child(5n) > a").text(),
      },
    }));

  res.status(200).json({ data: response, address });
}
