import { FundingRateItem } from 'src/app/shared/models/fr';

type ItemKey = keyof FundingRateItem;

export function isValidFundingRateItemKey(key: string): key is ItemKey {
  const validKeys: Record<PropertyKey, boolean> = {
    fundingRate: true,
    fundingRateChange: true,
  };
  return validKeys[key] === true;
}
