/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "bscscan.com",
      "etherscan.io",
      "polygonscan.com",
      "optimistic.etherscan.io",
    ],
  },
};

module.exports = nextConfig;
