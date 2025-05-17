export interface FundingRateItem {
  openTime: number;
  closeTime: number;
  fundingRate: number;
  fundingRateChange: number | null;
  normalizedFundingRate: number;
  exchanges: string[];
  colors: {
    fundingRate: string;
    fundingRateChange: string;
  };
}

export interface FundingRateData {
  symbol: string;
  exchanges: string[];
  imageUrl: string;
  category: string;
  data: FundingRateItem[];
}

export interface GroupedFundingRateData {
  intervalMin: number; // e.g., 8 * 3600 * 1000
  label: string; // e.g., '8h'
  data: FundingRateData[];
}
