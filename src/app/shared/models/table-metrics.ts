export interface TableMetricItem {
  openTime: number;
  closeTime: number;
  displayedColorValue: string;
  tooltipText: string;
  imageUrl?: string;

  // Metric-specific values — only some will be used per view
  fundingRate?: number;
  fundingRateChange?: number | null;
  normalizedFundingRate?: number;
  openInterest?: number;
  openInterestChange?: number;
  normalizedOpenInterest?: number;
  quoteVolume?: number;
  quoteVolumeChange?: number;
  normalizedQuoteVolume?: number;
  buyerRatio?: number;
  buyerRatioChange?: number;
  normalizedBuyerRatio?: number;
  volumeDelta?: number;
  volumeDeltaChange?: number;
  normalizedVolumeDelta?: number;
  perpSpotDiff?: number;
  normalizedPerpSpotDiff?: number;
  normalizedSpotClosePrice?: number;
  colors?: {
    openInterest: string;
    openInterestChange: string;
  };
  symbol: string;
  exchanges: string[]; // 👈 This is required!
}

export interface TableDataRow {
  symbol: string;
  imageUrl: string;
  category: string;
  exchanges: string[];
  data: TableMetricItem[];
}

export interface TableData {
  title: string;
  data: TableDataRow[];
}
