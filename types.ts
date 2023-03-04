export interface ResponseDataType {
  transactionHash: string;
  lastUpdated: string;
  assetName: string;
  assetAddress: string;
  assetIcon: string;
  approvedSpenderName: string;
  approvedSpenderAddress: string;
  allowance: {
    value: string;
    symbol: string;
  };
}

export interface ResponseData {
  data: Partial<ResponseDataType>[];
  address: string;
}
