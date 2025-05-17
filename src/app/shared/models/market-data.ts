import { FundingRateData } from './fr';
import { KlineData } from './kline';
import { OpentInterestData } from './oi';

export interface MarketData {
  timeframe: string;
  expirationTime: number;
  data: FundingRateData[] | KlineData[] | OpentInterestData[];
}
