export interface KlineDataItem {
  openTime: number;
  closeTime: number;
  closePrice: number;
  lowPrice: number;
  highPrice: number;
  quoteVolume: number;
  buyerRatio: number;
  volumeDelta: number;
  quoteVolumeChange: number;
  volumeDeltaChange: number;
  closePriceChange: number;
  buyerRatioChange: number;
  //spotClosePrice: number;
  perpSpotDiff: number;
  normalizedClosePrice: number;
  normalizedBuyerRatio: number;
  normalizedQuoteVolume: number;
  //normalizedSpotClosePrice: number;
  normalizedVolumeDelta: number;
  colors: {
    closePrice: string;
    closePriceChange: string;
    buyerRatio: string;
    buyerRatioChange: string;
    quoteVolume: string;
    quoteVolumeChange: string;
    perpSpotDiff: string;
    volumeDelta: string;
    volumeDeltaChange: string;
  };
}

export interface KlineData {
  symbol: string;
  exchanges: string[];
  imageUrl: string;
  category: string;
  data: KlineDataItem[];
}
