export interface ResponseData {
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
