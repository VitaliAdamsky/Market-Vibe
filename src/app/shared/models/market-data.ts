import { FundingRateData } from './fr';
import { KlineData } from './kline';
import { OpenInterestData } from './oi';

export interface MarketData {
  timeframe?: string;
  expirationTime: number;
  dataType: string;
  projectName: string;
  data: FundingRateData[] | KlineData[] | OpenInterestData[];
}
