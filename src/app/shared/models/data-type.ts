import { FundingRateData } from './fr';
import { KlineData } from './kline';
import { OpenInterestData } from './oi';

export type DataType = 'fr' | 'oi' | 'kline';

export type DataTypeMap = {
  oi: OpenInterestData;
  kline: KlineData;
  fr: FundingRateData;
};
