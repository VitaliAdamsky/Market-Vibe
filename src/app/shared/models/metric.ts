import { TF } from './timeframes';

export type PropertyName =
  | 'fundingRate'
  | 'fundingRateChange'
  | 'openInterest'
  | 'openInterestChange'
  | 'closePrice'
  | 'closePriceChange'
  | 'quoteVolume'
  | 'quoteVolumeChange'
  | 'buyerRatio'
  | 'buyerRatioChange'
  | 'volumeDelta'
  | 'volumeDeltaChange'
  | 'perpSpotDiff';

export interface Metric {
  title: string;
  propertyName: PropertyName; // e.g., 'fundingRateChange'
  dataUrl: string;
  timeframe?: TF;
}
