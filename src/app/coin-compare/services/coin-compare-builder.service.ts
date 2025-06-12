import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';
import { Coin } from 'src/app/shared/models/coin';
import { getRandomColor } from '../functions/get-random-color';
import { formatCompareTooltip } from '../functions/format-compare-tooltip';

import { OpenInterestItem } from 'src/app/shared/models/oi';
import { FundingRateItem } from 'src/app/shared/models/fr';
import { KlineDataItem } from 'src/app/shared/models/kline';
import { MarketData } from 'src/app/shared/models/market-data';
import { DataType, DataTypeMap } from 'src/app/shared/models/data-type';
import { TF } from 'src/app/shared/models/timeframes';
import { MetricCompareConfig } from '../models/metric-config';
import { CallbackDataParams } from 'echarts/types/dist/shared';

type DataItem<K extends DataType> = DataTypeMap[K]['data'][number];

@Injectable({ providedIn: 'root' })
export class CoinCompareBuilderService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  async buildMetricChart<K extends DataType>(
    coins: Coin[],
    timeframe: TF,
    config: MetricCompareConfig<K>
  ): Promise<EChartsOption | null> {
    if (!coins || coins.length === 0) return null;

    const dataList = await this.getOrFetchFromCache<K>(config.type, timeframe);
    if (!dataList || dataList.length === 0) return null;

    const coinData = coins
      .map((coin) => dataList.find((d) => d.symbol === coin.symbol))
      .filter((d): d is DataTypeMap[K] => !!d);

    if (coinData.length === 0) return null;

    const firstCoinTimeframeData = coinData[0].data;

    const xAxis = firstCoinTimeframeData.map((d) =>
      new Date(d.openTime).toISOString()
    );

    const series = coinData.map((item) => {
      const dataItems = item.data as DataItem<K>[];

      return {
        name: item.symbol,
        type: 'line' as const,
        data: dataItems.map((d, i) => {
          const value = d[config.valueKey] as number;
          const tooltipValue = d[config.tooltipKey] as number;

          console.log(`[${item.symbol}] #${i}`, {
            valueKey: config.valueKey,
            value,
            tooltipKey: config.tooltipKey,
            tooltipValue,
            openTime: d.openTime,
            closeTime: d.closeTime,
          });

          return {
            value,
            tooltipValue,
            openTime: d.openTime,
            closeTime: d.closeTime,
          };
        }),
        encode: {
          x: 'openTime',
          y: 'value',
        },
        symbol: 'circle',
        symbolSize: 3,
        itemStyle: { color: getRandomColor() },
        lineStyle: { width: 2 },
      };
    });

    return {
      title: {
        text: `${config.title} (${timeframe})`,
        left: 'center',
        textStyle: { color: '#ccc' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        backgroundColor: 'transparent',
        borderWidth: 0,
        formatter: (params: CallbackDataParams | CallbackDataParams[]) =>
          formatCompareTooltip(Array.isArray(params) ? params : [params]),
      },
      legend: {
        top: 30,
        textStyle: { color: '#ccc' },
        data: coinData.map((c) => c.symbol),
      },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLabel: {
          formatter: (value: string) =>
            new Date(value).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          color: '#ccc',
        },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
      },
      series,
    };
  }

  private async getOrFetchFromCache<K extends DataType>(
    dataType: K,
    timeframe: TF
  ): Promise<DataTypeMap[K][]> {
    const key = dataType === 'fr' ? dataType : `${dataType}-${timeframe}`;
    const now = Date.now();

    const cached = (await this.indexedDb.get(key)) as MarketData;
    if (cached && now < cached.expirationTime) {
      return cached.data as DataTypeMap[K][];
    }

    await new Promise<void>((resolve, reject) => {
      this.marketDataService.getMarketData<any>(dataType, timeframe).subscribe({
        next: () => resolve(),
        error: reject,
      });
    });

    const updated = (await this.indexedDb.get(key)) as MarketData;
    return updated.data as DataTypeMap[K][];
  }
}
