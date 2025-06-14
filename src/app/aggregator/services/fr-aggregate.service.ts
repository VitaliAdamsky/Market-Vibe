import { Injectable } from '@angular/core';
import type { EChartsOption, LineSeriesOption } from 'echarts';

import { MarketData } from 'src/app/shared/models/market-data';
import { DataType } from 'src/app/shared/models/data-type';
import { TF } from 'src/app/shared/models/timeframes';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';

import { getRandomColor } from 'src/app/coin-compare/functions/get-random-color';
import {
  FundingRateData,
  GroupedFundingRateData,
} from 'src/app/shared/models/fr';
import { getClosestInterval } from '../functions/get-closest-interval';
import { formatAggregateTooltip } from '../functions/formate-aggregate-tooltip';

@Injectable({ providedIn: 'root' })
export class FundingRateAggregateService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  async buildCharts(timeframe: TF): Promise<EChartsOption[]> {
    const fundingRateRaw: MarketData = await this.getOrFetchFromCache(
      'fr',
      timeframe
    );
    const grouped = this.groupByInterval(
      fundingRateRaw.data as FundingRateData[]
    );
    return grouped.map((group) => this.buildChart(group));
  }

  private buildChart(group: GroupedFundingRateData): EChartsOption {
    const countByTime = new Map<number, { count: number; closeTime: number }>();

    group.data.forEach((coin) => {
      coin.data.forEach((item) => {
        if (item.fundingRateChange != null && item.fundingRateChange > 0) {
          const time = item.openTime;
          const entry = countByTime.get(time);
          if (entry) {
            entry.count += 1;
          } else {
            countByTime.set(time, {
              count: 1,
              closeTime: item.closeTime,
            });
          }
        }
      });
    });

    const sortedTimes = Array.from(countByTime.keys()).sort((a, b) => a - b);
    const xAxis = sortedTimes.map((t) => new Date(t).toISOString());

    const series: LineSeriesOption[] = [
      {
        name: 'Funding Rate',
        type: 'line',
        symbol: 'circle',
        symbolSize: 3,
        itemStyle: { color: getRandomColor() },
        lineStyle: { width: 1 },
        data: sortedTimes.map((t) => {
          const point = countByTime.get(t)!;
          return {
            value: point?.count ?? 0,
            openTime: t,
            closeTime: point?.closeTime ?? t,
          };
        }),
      },
    ];

    return {
      title: {
        text: `Funding Rate ${group.label}`,
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
        textStyle: { color: '#ccc' },
      },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLabel: {
          color: '#ccc',
          formatter: (value: string) =>
            new Date(value).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
        },
      },
      yAxis: {
        type: 'value',
        name: 'Count > 0',
        axisLabel: { color: '#ccc' },
      },
      series,
    };
  }

  private groupByInterval(
    dataArray: FundingRateData[]
  ): GroupedFundingRateData[] {
    const map = new Map<number, FundingRateData[]>();

    dataArray.forEach((coin) => {
      coin.data.forEach((item) => {
        const intervalMs = item.closeTime - item.openTime;
        const intervalMin = Math.round(intervalMs / 60000);

        if (intervalMin <= 0 || intervalMin > 1440) {
          console.warn(`Invalid interval for ${coin.symbol}:`, item);
          return;
        }

        const logicalInterval = getClosestInterval(intervalMin);
        if (!map.has(logicalInterval)) {
          map.set(logicalInterval, []);
        }

        const bucket = map.get(logicalInterval)!;
        const existingCoin = bucket.find((c) => c.symbol === coin.symbol);
        if (existingCoin) {
          existingCoin.data.push(item);
        } else {
          map.get(logicalInterval)?.push({ ...coin, data: [item] });
        }
      });
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([intervalMin, coins]) => ({
        label: `Timeframe ${intervalMin / 60}h`,
        intervalMin,
        data: coins,
      }));
  }

  private async getOrFetchFromCache(
    dataType: DataType,
    timeframe: TF
  ): Promise<MarketData> {
    const key = dataType === 'fr' ? dataType : `${dataType}-${timeframe}`;
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
