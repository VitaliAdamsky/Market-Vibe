import { DataType } from 'src/app/shared/models/data-type';
import { KlineDataItem } from 'src/app/shared/models/kline';

export function getChartHeader(
  dataType: DataType,
  propertyKey?: keyof KlineDataItem
): string {
  if (dataType === 'oi') return 'Open Interest';
  if (dataType === 'fr') return 'Funding Rate';

  const labels: Partial<Record<keyof KlineDataItem, string>> = {
    closePrice: 'Close Price',
    quoteVolume: 'Volume',
    buyerRatio: 'Buyer Ratio',
    volumeDelta: 'Volume Delta',
    perpSpotDiff: 'Perp/Spot Diff',
    closePriceChange: 'Price Change',
    quoteVolumeChange: 'Volume Change',
    buyerRatioChange: 'Buyer Ratio Change',
    volumeDeltaChange: 'Volume Delta Change',
    normalizedClosePrice: 'Close Price',
    normalizedBuyerRatio: 'Buyer Ratio',
    normalizedQuoteVolume: 'Volume',
    normalizedVolumeDelta: 'Volume Delta',
  };

  return propertyKey ? labels[propertyKey] ?? 'Kline Metric' : 'Kline Metrics';
}
