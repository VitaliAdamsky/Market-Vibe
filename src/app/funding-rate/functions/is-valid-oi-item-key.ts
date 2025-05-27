import { OpenInterestItem } from '../../heatmap-table/models/oi';

type ItemKey = keyof OpenInterestItem;

export function isValidOpenInterestItemKey(key: string): key is ItemKey {
  const validKeys: Record<PropertyKey, boolean> = {
    openTime: true,
    openInterest: true,
    openInterestChange: true,
    normalizedOpenInterest: true,
    colors: true,
  };
  return validKeys[key] === true;
}
