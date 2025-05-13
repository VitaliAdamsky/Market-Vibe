export interface OpentInterestItem {
  openTime: number;
  symbol: string;
  openInterest: number;
  openInterestChange: number;
  colors: {
    openInterest: string;
    openInterestChange: string;
  };
}

export interface OpentInterestData {
  symbol: string;
  exchanges: string[];
  imageUrl: string;
  category: string;
  data: OpentInterestItem[];
}

export interface OpenInterestTableRow extends OpentInterestItem {
  symbol: string; // From OpentInterestData
  imageUrl: string;
  category: string;
  exchangeList: string[]; // optional: rename for clarity
}
