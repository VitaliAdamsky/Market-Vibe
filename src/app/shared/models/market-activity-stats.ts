export interface MarketActivityStats {
  symbol: string;
  imageUrl?: string;
  category?: string;
  exchanges?: string[];
  openTime: number;
  closeTime: number;
  fundingRateChange: number;
  openInterestChange: number;
  volumeChange: number;
  volumeDeltaChange: number;
  closePriceChange: number;
  perpSpotDiff: number;
  buyerRatioChange: number;
  closePriceChangeColor?: string;
  buyerRatioChangeColor?: string;
  quoteVolumeChangeColor?: string;
  volumeDeltaChangeColor?: string;
  perpSpotDiffColor?: string;
  fundingRateChangeColor?: string;
  openInterestChangeColor?: string;
  volumeChangeColor?: string;
}
