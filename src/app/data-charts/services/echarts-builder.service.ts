import { EChartsOption } from 'echarts';
import { MarketData } from 'src/app/shared/models/market-data';
import { OpenInterestItem } from 'src/app/shared/models/oi';
import { DataType } from 'src/app/shared/models/data-type';
import { TF } from 'src/app/shared/models/timeframes';
import { Injectable } from '@angular/core';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';
import { ChartResult } from 'src/app/shared/models/chart-result';
import { castMarketData } from 'src/app/utils/cast-market-data';
import { KlineDataItem } from 'src/app/shared/models/kline';
import { formatTooltip } from '../functions/format-tooltip';
import { FundingRateItem } from 'src/app/shared/models/fr';

@Injectable({ providedIn: 'root' })
export class EchartsBuilderService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  // Helper: Safely extract a number from a KlineDataItem by key
  getKlineValue(item: KlineDataItem, key: keyof KlineDataItem): number {
    const value = item[key];
    return typeof value === 'number' ? value : 0;
  }

  // Main function
  async buildChartOptions(
    dataType: DataType,
    timeframe: TF,
    propertyKey?: keyof KlineDataItem
  ): Promise<ChartResult[]> {
    const marketData = await this.getOrFetchFromCache(dataType, timeframe);
    const data = castMarketData(dataType, marketData.data);

    const results: ChartResult[] = [];

    for (const coin of data) {
      const xAxisData = coin.data.map((d) =>
        new Date(d.openTime).toLocaleString()
      );

      const seriesData: number[] =
        dataType === 'oi'
          ? (coin.data as OpenInterestItem[]).map((d) => d.openInterest)
          : dataType === 'kline' && propertyKey
          ? (coin.data as KlineDataItem[]).map((d) =>
              this.getKlineValue(d, propertyKey)
            )
          : dataType === 'fr'
          ? (coin.data as FundingRateItem[]).map((d) => d.fundingRate)
          : [];

      const chartOptions: EChartsOption = {
        toolbox: { show: false },
        title: {
          text: coin.symbol,
          left: 'center',
          textStyle: { color: '#ccc' },
        },
        textStyle: { color: '#fff' },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'line' },
          backgroundColor: 'transparent',
          borderWidth: 0,
          formatter: (params) =>
            formatTooltip(params, coin.data, dataType, propertyKey),
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            formatter: (value: string | number) => {
              const date = new Date(value);
              return date.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });
            },
            color: '#ccc',
          },
        },
        yAxis: { show: false },
        series: [
          {
            name:
              dataType === 'oi'
                ? 'Open Interest'
                : propertyKey ?? 'Kline Metric',
            type: 'line',
            data: seriesData,
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: { color: '#fff' },
            lineStyle: { color: '#5470C6', width: 1 },
          },
        ],
      };

      results.push({
        options: chartOptions,
        symbol: coin.symbol,
        imageUrl: coin.imageUrl,
        category: coin.category,
        exchanges: coin.exchanges,
      });
    }

    return results;
  }

  private async getOrFetchFromCache(
    dataType: DataType,
    timeframe: TF
  ): Promise<MarketData> {
    const key = dataType === 'fr' ? dataType : `${dataType}-${timeframe}`;
    const now = Date.now();
    const cached = (await this.indexedDb.get(key)) as MarketData | undefined;

    if (cached && now < cached.expirationTime) {
      return cached;
    }

    await new Promise<void>((resolve, reject) => {
      this.marketDataService.getMarketData<any>(dataType, timeframe).subscribe({
        next: () => resolve(),
        error: reject,
      });
    });

    const updated = (await this.indexedDb.get(key)) as MarketData;
    return updated;
  }
}
