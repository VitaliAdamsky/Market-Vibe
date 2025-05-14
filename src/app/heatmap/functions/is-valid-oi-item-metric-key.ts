import { OpentInterestItem } from '../models/oi';

type OpentInterestItemMetricKey = keyof OpentInterestItem;

export function isValidOpentInterestItemMetric(
  key: string
): key is OpentInterestItemMetricKey {
  const validKeys: Record<PropertyKey, boolean> = {
    openTime: true,
    openInterest: true,
    openInterestChange: true,
    normalizedOpenInterest: true,
    colors: true,
  };
  return validKeys[key] === true;
}
