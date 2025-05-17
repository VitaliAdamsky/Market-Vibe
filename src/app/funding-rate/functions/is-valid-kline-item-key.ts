import { KlineItem } from '../../heatmap-table/models/kline';

type ItemKey = keyof KlineItem;

export function isValidKlineItemKey(key: string): key is ItemKey {
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
    spotClosePrice: true,
    perpSpotDiff: true,
    normalizedClosePrice: true,
    normalizedBuyerRatio: true,
    normalizedQuoteVolume: true,
    normalizedSpotClosePrice: true,
    normalizedVolumeDelta: true,
    colors: true,
  };
  return validKeys[key] === true;
}
