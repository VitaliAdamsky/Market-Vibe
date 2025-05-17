import { TF } from './timeframes';

export type PropertyName =
  | 'fundingRate'
  | 'fundingRateChange'
  | 'openInterest'
  | 'openInterestChange';

export interface Metric {
  title: string;
  propertyName: PropertyName; // e.g., 'fundingRateChange'
  dataUrl: string;
  timeframe?: TF;
}
