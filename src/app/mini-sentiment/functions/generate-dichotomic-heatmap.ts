import { MarketActivityStats } from 'src/app/shared/models/market-activity-stats';

export function generateDichotomicHeatmap(
  data: MarketActivityStats[],
  metricKey: string
) {
  const values = data.filter(
    (item) =>
      !isNaN(Number((item as any)[metricKey])) ||
      Number((item as any)[metricKey]) !== 0
  );
  return values
    .map((item) => {
      const value = Number((item as any)[metricKey]);
      const color = value > 0 ? '#4dffb8' : '#ff80b3';
      return {
        value,
        color,
        full: item,
      };
    })
    .sort((a, b) => a.value - b.value);
}
