import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartResult } from 'src/app/shared/models/chart-result';
import { TF } from 'src/app/shared/models/timeframes';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';
import { FundingRateData } from 'src/app/shared/models/fr';
import { OpenInterestData } from 'src/app/shared/models/oi';
import { KlineData } from 'src/app/shared/models/kline';
import { DataType } from 'src/app/shared/models/data-type';
import { MarketData } from 'src/app/shared/models/market-data';

@Injectable({ providedIn: 'root' })
export class NormalizedMetricsChartService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  async buildNormalizedChart(
    symbol: string,
    timeframe: TF
  ): Promise<ChartResult | null> {
    const [oi, fr, kline] = await Promise.all([
      this.getOrFetchFromCache<OpenInterestData>('oi', timeframe),
      this.getOrFetchFromCache<FundingRateData>('fr', timeframe),
      this.getOrFetchFromCache<KlineData>('kline', timeframe),
    ]);

    const coinOi = oi.find((c) => c.symbol === symbol);
    const coinFr = fr.find((c) => c.symbol === symbol);
    const coinKline = kline.find((c) => c.symbol === symbol);

    if (!coinOi || !coinFr || !coinKline) return null;

    const xAxis = coinKline.data.map((d) => new Date(d.openTime).toISOString());

    const series = [
      {
        name: 'OI',
        data: coinOi.data.map((d) => d.normalizedOpenInterest),
        color: '#ffcc00',
      },
      {
        name: 'FR',
        data: this.alignFundingRateToKlines(coinKline.data, coinFr.data),
        color: '#00e676',
      },
      {
        name: 'Price',
        data: coinKline.data.map((d) => d.normalizedClosePrice),
        color: '#42a5f5',
      },
      {
        name: 'Buyer Ratio',
        data: coinKline.data.map((d) => d.normalizedBuyerRatio),
        color: '#ab47bc',
      },
      {
        name: 'Volume',
        data: coinKline.data.map((d) => d.normalizedQuoteVolume),
        color: '#ff7043',
      },
      {
        name: 'Volume Δ',
        data: coinKline.data.map((d) => d.normalizedVolumeDelta),
        color: '#e6005c',
      },
    ];

    const options: EChartsOption = {
      title: {
        text: 'Normalized Metrics',
        left: 'center',
        textStyle: { color: '#ccc' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        backgroundColor: 'transparent', // 👈 disables the white background
        borderColor: 'transparent', // 👈 removes any border
        extraCssText: 'box-shadow: none;', // 👈 removes default shadow if present
        formatter: (params: any) => {
          const index = params[0].dataIndex;

          const format = (dateStr: number) =>
            new Date(dateStr).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: 'short',
            });

          const oiPoint = coinOi.data[index];
          const frPoint = coinFr.data[index];
          const klinePoint = coinKline.data[index];

          if (!oiPoint || !frPoint || !klinePoint) return '';

          const openTime = klinePoint.openTime;
          const closeTime = klinePoint.closeTime;

          const html = `
      <div style="
        background: #2f2f2f;
        color: #f1f1f1;
        padding: 10px;
        border-radius: 6px;
        font-size: 13px;
        line-height: 1.6;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
      ">
        <div><span style="color:#aaa;">Open:</span> ${format(openTime)}</div>
        <div><span style="color:#aaa;">Close:</span> ${format(closeTime)}</div>
        <div><span style="color:#aaa;">OI Change:</span> ${
          oiPoint.openInterestChange
        }%</div>
        <div><span style="color:#aaa;">FR Change:</span> ${
          frPoint.fundingRateChange
        }%</div>
        <div><span style="color:#aaa;">Close Price Change:</span> ${
          klinePoint.closePriceChange
        }%</div>
        <div><span style="color:#aaa;">Volume Change:</span> ${
          klinePoint.quoteVolumeChange
        }%</div>
        <div><span style="color:#aaa;">Buyer Ratio:</span> ${
          klinePoint.buyerRatio
        }%</div>
        <div><span style="color:#aaa;">Volume Δ Change:</span> ${
          klinePoint.volumeDeltaChange
        }%</div>
      </div>
    `;

          return html;
        },
      },
      legend: {
        top: 30,
        textStyle: { color: '#ccc' },
      },
      textStyle: { color: '#fff' },
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
      series: series.map((s) => ({
        name: s.name,
        type: 'line',
        data: s.data,
        symbol: 'circle',
        symbolSize: 3,
        itemStyle: { color: s.color },
        lineStyle: { color: s.color, width: 1 },
      })),
    };

    return {
      options,
      symbol,
      imageUrl: coinKline.imageUrl,
      category: coinKline.category,
      exchanges: coinKline.exchanges,
    };
  }

  private alignFundingRateToKlines(
    klineData: KlineData['data'],
    fundingRateData: FundingRateData['data']
  ): number[] {
    return klineData.map((kline) => {
      const kTime = kline.openTime;
      const fr = fundingRateData.find(
        (f) => f.openTime <= kTime && kTime < f.closeTime
      );
      return fr?.normalizedFundingRate ?? 0;
    });
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
