import { FundingRateData } from './fr';
import { KlineData } from './kline';
import { OpentInterestData } from './oi';

export interface MarketData {
  timeframe?: string;
  expirationTime: number;
  dataType: string;
  projectName: string;
  data: FundingRateData[] | KlineData[] | OpentInterestData[];
}
