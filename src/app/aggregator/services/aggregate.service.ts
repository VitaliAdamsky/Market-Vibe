import { Injectable } from '@angular/core';
import type { EChartsOption, LineSeriesOption } from 'echarts';

import { MarketData } from 'src/app/shared/models/market-data';
import { OpenInterestItem } from 'src/app/shared/models/oi';
import { KlineDataItem } from 'src/app/shared/models/kline';
import { DataType } from 'src/app/shared/models/data-type';
import { TF } from 'src/app/shared/models/timeframes';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';

import { LABELS_MAP } from '../functions/labels-map';
import { getRandomColor } from 'src/app/coin-compare/functions/get-random-color';
import { formatAggregateTooltip } from '../functions/formate-aggregate-tooltip';

type MetricKey =
  | 'quoteVolumeChange'
  | 'volumeDeltaChange'
  | 'closePriceChange'
  | 'buyerRatioChange'
  | 'perpSpotDiff'
  | 'openInterestChange';

@Injectable({ providedIn: 'root' })
export class AggregateService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  async buildAggregatedChart(timeframe: TF): Promise<EChartsOption> {
    const [klineRaw, oiRaw]: [MarketData, MarketData] = await Promise.all([
      this.getOrFetchFromCache('kline', timeframe),
      this.getOrFetchFromCache('oi', timeframe),
    ]);

    const firstCoinTimeframeData = klineRaw.data[0].data as KlineDataItem[];

    // Создаём мапу openTime => KlineDataItem
    const openTimeMap = new Map<number, KlineDataItem>();
    for (const item of firstCoinTimeframeData) {
      openTimeMap.set(item.openTime, item);
    }

    // Инициализируем бакеты по openTime
    const timeBuckets = new Map<number, Record<MetricKey, number>>();
    for (const item of firstCoinTimeframeData) {
      timeBuckets.set(item.openTime, initBucket());
    }

    // Kline-метрики
    for (const entry of klineRaw.data as any[]) {
      for (const item of entry.data as KlineDataItem[]) {
        const bucket = timeBuckets.get(item.openTime);
        if (!bucket) continue;

        if (item.quoteVolumeChange > 0) bucket['quoteVolumeChange']++;
        if (item.volumeDeltaChange > 0) bucket['volumeDeltaChange']++;
        if (item.closePriceChange > 0) bucket['closePriceChange']++;
        if (item.buyerRatioChange > 0) bucket['buyerRatioChange']++;
        if (item.perpSpotDiff > 0) bucket['perpSpotDiff']++;
      }
    }

    // Open Interest — привязываем по ближайшему openTime
    for (const entry of oiRaw.data as any[]) {
      for (const item of entry.data as OpenInterestItem[]) {
        // Ищем ближайший openTime
        const match = firstCoinTimeframeData.find(
          (k) => k.openTime === item.openTime
        );
        if (!match) continue;

        const bucket = timeBuckets.get(match.openTime);
        if (!bucket) continue;

        if (item.openInterestChange > 0) bucket['openInterestChange']++;
      }
    }

    const xAxis = firstCoinTimeframeData.map((d) =>
      new Date(d.openTime).toISOString()
    );

    const keys = Object.keys(LABELS_MAP).filter(
      (key) => key !== 'fundingRateChange'
    ) as MetricKey[];

    const series: LineSeriesOption[] = keys.map((key) => ({
      name: LABELS_MAP[key],
      type: 'line' as const,
      symbol: 'circle',
      symbolSize: 3,
      itemStyle: { color: getRandomColor() },
      lineStyle: { width: 1 },
      data: firstCoinTimeframeData.map((d) => {
        const bucket = timeBuckets.get(d.openTime);
        return {
          value: bucket ? bucket[key] : 0,
          openTime: d.openTime,
          closeTime: d.closeTime,
        };
      }),
    }));

    return {
      title: {
        text: `Timeframe ${timeframe}`,
        left: 'center',
        textStyle: { color: '#ccc' },
      },
      textStyle: { color: '#fff' },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        backgroundColor: 'transparent',
        borderWidth: 0,
        formatter: (params: any) => formatAggregateTooltip(params),
      },
      legend: {
        top: 30,
        data: keys.map((k) => LABELS_MAP[k]),
        textStyle: { color: '#ccc' },
      },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLabel: {
          color: '#ccc',
          formatter: (value: string | number) => {
            const date = new Date(value);
            return date.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Count > 0',
        axisLabel: {
          color: '#ccc',
        },
      },
      series,
    } as EChartsOption;
  }

  private async getOrFetchFromCache(
    dataType: DataType,
    timeframe: TF
  ): Promise<MarketData> {
    const key = `${dataType}-${timeframe}`;
    const now = Date.now();
    const cached = (await this.indexedDb.get(key)) as MarketData | undefined;

    if (cached && now < cached.expirationTime) return cached;

    await new Promise<void>((resolve, reject) => {
      this.marketDataService.getMarketData<any>(dataType, timeframe).subscribe({
        next: () => resolve(),
        error: reject,
      });
    });

    return (await this.indexedDb.get(key)) as MarketData;
  }
}

// Инициалка значений
function initBucket() {
  return {
    quoteVolumeChange: 0,
    volumeDeltaChange: 0,
    closePriceChange: 0,
    buyerRatioChange: 0,
    perpSpotDiff: 0,
    openInterestChange: 0,
  };
}
