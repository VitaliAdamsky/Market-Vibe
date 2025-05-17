import { OpentInterestItem } from 'src/app/shared/models/oi';

type ItemKey = keyof OpentInterestItem;

export function isValidOpentInterestItemKey(key: string): key is ItemKey {
  const validKeys: Record<PropertyKey, boolean> = {
    openTime: true,
    openInterest: true,
    openInterestChange: true,
    normalizedOpenInterest: true,
    colors: true,
  };
  return validKeys[key] === true;
}
