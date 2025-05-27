import { OpenInterestComponent } from './../../open-interest/open-interest.component';
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
  closePrice?: number;
  closePriceChange?: number;
  normalizedClosePrice?: number;
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
    OpenInterestComponent?: string;
    openInterestChange?: string;
    fundingRate?: string;
    fundingRateChange?: string;
    quoteVolume?: string;
    quoteVolumeChange?: string;
    buyerRatio?: string;
    buyerRatioChange?: string;
    volumeDelta?: string;
    volumeDeltaChange?: string;
    perpSpotDiff?: string;
  };
  symbol: string;
  exchanges: string[];
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
