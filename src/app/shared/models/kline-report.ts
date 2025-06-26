import { Coin } from './coin';
import { TF } from './timeframes';

export interface KlineReport {
  timeframe: TF;
  expirationTime: number;
  coin: Coin;
  data: KlineReportItem[];
}

export interface KlineReportItem {
  openTime: number;
  closeTime: number;
  closePrice: number;
  buyerRatio: number;
  buyerRatioChange: number;
  quoteVolume: number;
  quoteVolumeChange: number;
  perpSpotDiff: number;
  volumeDelta: number;
  volumeDeltaChange: number;
  openInterest: number;
}
