import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { MarketData } from 'src/app/shared/models/market-data';
import { OpenInterestData, OpenInterestItem } from 'src/app/shared/models/oi';
import { FundingRateItem } from 'src/app/shared/models/fr';
import { KlineDataItem } from 'src/app/shared/models/kline';
import { DataType } from 'src/app/shared/models/data-type';
import { TF } from 'src/app/shared/models/timeframes';
import { ChartResult } from 'src/app/shared/models/chart-result';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';
import { Coin } from 'src/app/shared/models/coin';
import { getRandomColor } from '../functions/get-random-color';
import { formatTooltip } from 'src/app/data-charts/functions/format-tooltip';
import { formatCompareTooltip } from '../functions/format-compare-tooltip';

@Injectable({ providedIn: 'root' })
export class CoinCompareBuilderService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  async buildOiChartForCoins(
    coins: Coin[],
    timeframe: TF
  ): Promise<EChartsOption | null> {
    const dataList = await this.getOrFetchFromCache<OpenInterestData>(
      'oi',
      timeframe
    );

    if (!dataList || dataList.length === 0) return null;

    // Фильтруем только те монеты, которые есть в списке
    const coinOis = coins
      .map((coin) => dataList.find((c) => c.symbol === coin.symbol))
      .filter((c): c is OpenInterestData => !!c);

    if (coinOis.length === 0) return null;

    // Все временные метки первой монеты будем использовать как ось X
    const xAxis = coinOis[0].data.map((d) =>
      new Date(d.openTime).toISOString()
    );

    // Строим серию для каждой монеты
    const series = coinOis.map((coinOi) => ({
      name: coinOi.symbol,
      type: 'line' as const,
      data: coinOi.data.map((d) => d.normalizedOpenInterest),
      symbol: 'circle',
      symbolSize: 3,
      itemStyle: { color: getRandomColor() },
      lineStyle: { width: 2 },
    }));

    const option: EChartsOption = {
      title: {
        text: 'Open Interest Comparison',
        left: 'center',
        textStyle: { color: '#ccc' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        backgroundColor: 'transparent',
        borderWidth: 0,
        formatter: (params) =>
          formatCompareTooltip(
            params,
            coinOis.map((c) => c.data)
          ),
      },
      legend: {
        top: 30,
        textStyle: { color: '#ccc' },
        data: coinOis.map((c) => c.symbol),
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

    return option;
  }

  private async getOrFetchFromCache<T>(
    dataType: DataType,
    timeframe: TF
  ): Promise<T[]> {
    const key = dataType === 'fr' ? dataType : `${dataType}-${timeframe}`;
    const now = Date.now();

    const cached = (await this.indexedDb.get(key)) as MarketData | undefined;

    if (cached && now < cached.expirationTime) {
      return cached.data as T[];
    }

    // Запрашиваем данные через MarketDataService
    await new Promise<void>((resolve, reject) => {
      this.marketDataService.getMarketData<any>(dataType, timeframe).subscribe({
        next: () => resolve(),
        error: reject,
      });
    });

    const updated = (await this.indexedDb.get(key)) as MarketData;
    return updated.data as T[];
  }
}
