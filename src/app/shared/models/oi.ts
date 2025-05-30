export interface OpenInterestItem {
  closeTime: number;
  openTime: number;
  symbol: string;
  openInterest: number;
  openInterestChange: number;
  normalizedOpenInterest: number;
  colors: {
    openInterest: string;
    openInterestChange: string;
  };
}

export interface OpenInterestData {
  symbol: string;
  exchanges: string[];
  imageUrl: string;
  category: string;
  data: OpenInterestItem[];
}
