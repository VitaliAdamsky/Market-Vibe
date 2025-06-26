import { TF } from './timeframes';

export interface FrReport {
  expirationTime: number;
  symbol: string;
  data: FrReportItem[];
}

export interface FrReportItem {
  openTime: number;
  closeTime: number;
  fundingRate: number;
}
