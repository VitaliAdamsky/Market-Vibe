import { EChartsOption } from 'echarts';
import { MarketData } from 'src/app/shared/models/market-data';
import { OpenInterestData } from 'src/app/shared/models/oi';
import { DataType } from 'src/app/shared/models/data-type';
import { TF } from 'src/app/shared/models/timeframes';
import { Injectable } from '@angular/core';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';
import { ChartResult } from 'src/app/shared/models/chart-result';

@Injectable({ providedIn: 'root' })
export class EchartsBuilderService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  async buildEchartsOptionsForOI(timeframe: TF): Promise<ChartResult[]> {
    const marketData = await this.getOrFetchFromCache('oi', timeframe);
    const oiData = marketData.data as OpenInterestData[];

    const results: ChartResult[] = [];

    for (const coin of oiData) {
      const xAxisData = coin.data.map((d) =>
        new Date(d.openTime).toLocaleString()
      );
      const seriesData = coin.data.map((d) => d.openInterest);

      const chartOptions: EChartsOption = {
        toobox: { show: false },
        title: {
          text: coin.symbol,
          left: 'center',
          textStyle: { color: '#ccc' },
        },
        textStyle: {
          color: '#fff',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
          },
          backgroundColor: 'transparent', // prevent double background
          borderWidth: 0, // remove default border
          formatter: (params) => {
            const items = params as any[];
            const item = items[0]; // Single point hovered
            const index = item.dataIndex; // Index of the hovered bar
            const pointData = coin.data[index]; // Grab the full raw object

            const format = (dateStr: number) =>
              new Date(dateStr).toLocaleString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'short',
                //year: '2-digit',
              });

            return `
  <div style="
    background: #2f2f2f;
    color: #f1f1f1;
    padding: 10px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    ">
    <div><span style="color:#aaa;">Open:</span> ${format(
      pointData.openTime
    )}</div>
    <div><span style="color:#aaa;">Close:</span> ${format(
      pointData.closeTime
    )}</div>
    <div><span style="color:#aaa;">Change:</span> ${
      pointData.openInterestChange
    }%</div>
  </div>
`;
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData, // timestamps (number or ISO string)
          axisLabel: {
            formatter: (value: string | number) => {
              const date = new Date(value);
              return date.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });
            },
            color: '#ccc', // optional: style the label for dark theme
          },
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            name: 'Open Interest',
            type: 'line',
            data: seriesData,
            symbol: 'circle', // default is 'circle', but you can use 'rect', 'diamond', etc.
            symbolSize: 3, // 👈 make the dots smaller (default is 10)
            //barCategoryGap: '60%', // Try 30% to 50%
            //barWidth: '60%', // Optional: Set fixed width
            itemStyle: {
              color: '#fff',
            },
            lineStyle: {
              color: '#5470C6',
              width: 1,
            },
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
