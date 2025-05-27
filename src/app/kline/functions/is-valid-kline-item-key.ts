import { KlineDataItem } from '../../shared/models/kline';

type ItemKey = keyof KlineDataItem;

export function isValidKlineDataItemKey(key: string): key is ItemKey {
  const validKeys: Record<PropertyKey, boolean> = {
    openTime: true,
    closeTime: true,
    closePrice: true,
    quoteVolume: true,
    buyerRatio: true,
    volumeDelta: true,
    quoteVolumeChange: true,
    volumeDeltaChange: true,
    closePriceChange: true,
    buyerRatioChange: true,
    perpSpotDiff: true,
    normalizedClosePrice: true,
    normalizedBuyerRatio: true,
    normalizedQuoteVolume: true,
    normalizedVolumeDelta: true,
    colors: true,
  };
  return validKeys[key] === true;
}
