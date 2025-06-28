import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartResult } from 'src/app/shared/models/chart-result';
import { TF } from 'src/app/shared/models/timeframes';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';
import { KlineData, KlineDataItem } from 'src/app/shared/models/kline';
import { DataType } from 'src/app/shared/models/data-type';
import { MarketData } from 'src/app/shared/models/market-data';

// --- Вспомогательные интерфейсы для данных с рассчитанным VWAP ---

/**
 * Расширенный интерфейс KlineDataItem, включающий рассчитанные значения VWAP.
 */
interface KlineDataItemWithVwap extends KlineDataItem {
  rollingVwap?: number;
  upperBand?: number;
  lowerBand?: number;
}

/**
 * Расширенный интерфейс KlineData для работы с новыми данными.
 */
interface KlineDataWithVwap extends Omit<KlineData, 'data'> {
  data: KlineDataItemWithVwap[];
}

@Injectable({ providedIn: 'root' })
export class RollingVwapService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  /**
   * Основной публичный метод. Получает данные, рассчитывает VWAP и строит конфигурацию для графика.
   * @param symbol - Символ (тикер), для которого строится график.
   * @param minBars - Минимальное количество свечей в окне (по умолчанию 10).
   * @returns Объект ChartResult или null, если данные не найдены.
   */
  async buildVwapChart(
    symbol: string,
    minBars: number = 10
  ): Promise<ChartResult | null> {
    // 1. Получаем данные для всех таймфреймов
    const findDataForSymbol = (data: KlineData[] | undefined) =>
      data?.find((d) => d.symbol === symbol);

    const klineH1 = findDataForSymbol(
      await this.getOrFetchFromCache<KlineData>('kline', TF.h1)
    );
    const klineH4 = findDataForSymbol(
      await this.getOrFetchFromCache<KlineData>('kline', TF.h4)
    );
    const klineH12 = findDataForSymbol(
      await this.getOrFetchFromCache<KlineData>('kline', TF.h12)
    );

    if (!klineH1) {
      console.error(
        `Не удалось найти данные Kline для символа ${symbol} и таймфрейма 1h.`
      );
      return null;
    }

    // 2. Рассчитываем VWAP для каждого набора данных
    const vwapDataByTimeframe: { [timeframe: string]: KlineDataWithVwap } = {};

    if (klineH1)
      vwapDataByTimeframe[TF.h1] = this._calculateRollingVwap(
        klineH1,
        TF.h1,
        minBars
      );
    if (klineH4)
      vwapDataByTimeframe[TF.h4] = this._calculateRollingVwap(
        klineH4,
        TF.h4,
        minBars
      );
    if (klineH12)
      vwapDataByTimeframe[TF.h12] = this._calculateRollingVwap(
        klineH12,
        TF.h12,
        minBars
      );

    // 3. Генерируем опции для ECharts
    const chartOptions = this._generateVwapChartOptions(
      vwapDataByTimeframe,
      TF.h1
    );

    // 4. Формируем и возвращаем итоговый результат
    return {
      options: chartOptions,
      symbol: klineH1.symbol,
      imageUrl: klineH1.imageUrl,
      category: klineH1.category,
      exchanges: klineH1.exchanges,
    };
  }

  /**
   * Рассчитывает Rolling VWAP, используя временное окно, а не фиксированное количество свечей.
   * @param klineData - Данные Kline.
   * @param timeframe - Текущий таймфрейм для определения размера временного окна.
   * @param minBars - Минимальное количество свечей, которое должно быть в окне.
   */
  private _calculateRollingVwap(
    klineData: KlineData,
    timeframe: TF,
    minBars: number
  ): KlineDataWithVwap {
    const dataWithVwap: KlineDataItemWithVwap[] = klineData.data.map(
      (item) => ({ ...item })
    );
    const timeWindowMs = this._getTimeWindowForTimeframe(timeframe);

    if (
      dataWithVwap.length > 0 &&
      (dataWithVwap[0].highPrice === undefined ||
        dataWithVwap[0].lowPrice === undefined)
    ) {
      console.error(
        'Ошибка: Для расчета VWAP (hlc3) необходимы highPrice и lowPrice в данных KlineDataItem, но они отсутствуют.'
      );
      return { ...klineData, data: dataWithVwap };
    }

    for (let i = 0; i < dataWithVwap.length; i++) {
      const currentBar = dataWithVwap[i];
      const windowStartTime = currentBar.openTime - timeWindowMs;

      const window: KlineDataItem[] = [];

      for (let j = i; j >= 0; j--) {
        const pastBar = dataWithVwap[j];
        if (pastBar.openTime >= windowStartTime) {
          window.unshift(pastBar);
        } else {
          if (window.length < minBars) {
            window.unshift(pastBar);
          } else {
            break;
          }
        }
      }

      if (window.length === 0) continue;

      let sumSrcVol = 0;
      let sumVol = 0;
      let sumSrcSrcVol = 0;

      for (const curr of window) {
        const hlc3 = (curr.highPrice + curr.lowPrice + curr.closePrice) / 3;
        sumVol += curr.quoteVolume;
        sumSrcVol += hlc3 * curr.quoteVolume;
        sumSrcSrcVol += curr.quoteVolume * Math.pow(hlc3, 2);
      }

      if (sumVol === 0) continue;

      const rollingVwap = sumSrcVol / sumVol;
      const variance = Math.max(
        0,
        sumSrcSrcVol / sumVol - Math.pow(rollingVwap, 2)
      );
      const stDev = Math.sqrt(variance);

      dataWithVwap[i].rollingVwap = rollingVwap;
      dataWithVwap[i].upperBand = rollingVwap + stDev;
      dataWithVwap[i].lowerBand = rollingVwap - stDev;
    }

    return { ...klineData, data: dataWithVwap };
  }

  /**
   * Определяет размер временного окна в миллисекундах для каждого таймфрейма.
   */
  private _getTimeWindowForTimeframe(timeframe: TF): number {
    const MS_IN_HOUR = 3600 * 1000;
    const MS_IN_DAY = 24 * MS_IN_HOUR;

    switch (timeframe) {
      case TF.h1:
        return MS_IN_DAY; // 1 день для часового графика
      case TF.h4:
        return MS_IN_DAY * 3; // 3 дня для 4-часового
      case TF.h12:
        return MS_IN_DAY * 7; // 7 дней для 12-часового
      default:
        return MS_IN_DAY;
    }
  }

  /**
   * Вспомогательная функция для определения количества знаков после запятой.
   */
  private _getDecimalPlaces(value: number): number {
    if (Math.floor(value) === value || !isFinite(value)) return 0;
    const valueStr = value.toString();
    const decimalPart = valueStr.split('.')[1];
    return decimalPart ? decimalPart.length : 0;
  }

  /**
   * Генерирует конфигурацию ECharts для отображения Rolling VWAP по нескольким таймфреймам.
   */
  private _generateVwapChartOptions(
    vwapDataByTimeframe: { [timeframe: string]: KlineDataWithVwap },
    baseTimeframe: TF
  ): EChartsOption {
    const baseData = vwapDataByTimeframe[baseTimeframe];
    const xAxisData = baseData.data.map((item) => item.openTime);
    const series: any[] = [];
    const legendData = ['Close Price'];
    const colors = {
      [TF.h1]: '#5470C6',
      [TF.h4]: '#91CC75',
      [TF.h12]: '#FAC858',
    };

    series.push({
      name: 'Close Price',
      type: 'line',
      data: baseData.data.map((item) => item.closePrice),
      symbol: 'none',
      lineStyle: { width: 2, color: '#cccccc' },
    });

    for (const timeframe of Object.keys(vwapDataByTimeframe)) {
      const tfData = vwapDataByTimeframe[timeframe];
      if (!tfData) continue;

      const tfDataMap = new Map<number, KlineDataItemWithVwap>(
        tfData.data.map((item) => [item.openTime, item])
      );

      const alignedVwap: (number | null)[] = [];
      const alignedUpper: (number | null)[] = [];
      const alignedLower: (number | null)[] = [];

      let lastKnownVwap: number | null = null,
        lastKnownUpper: number | null = null,
        lastKnownLower: number | null = null;

      for (const baseItem of baseData.data) {
        if (tfDataMap.has(baseItem.openTime)) {
          const currentItem = tfDataMap.get(baseItem.openTime)!;
          lastKnownVwap = currentItem.rollingVwap ?? null;
          lastKnownUpper = currentItem.upperBand ?? null;
          lastKnownLower = currentItem.lowerBand ?? null;
        }
        alignedVwap.push(lastKnownVwap);
        alignedUpper.push(lastKnownUpper);
        alignedLower.push(lastKnownLower);
      }

      const color = colors[timeframe as keyof typeof colors] || '#ccc';

      legendData.push(`VWAP ${timeframe}`);
      series.push({
        name: `VWAP ${timeframe}`,
        type: 'line',
        data: alignedVwap,
        symbol: 'none',
        lineStyle: { width: 2, color: color },
      });

      legendData.push(`Upper Band ${timeframe}`);
      series.push({
        name: `Upper Band ${timeframe}`,
        type: 'line',
        data: alignedUpper,
        symbol: 'none',
        lineStyle: { width: 1, type: 'dashed', color: color },
      });

      legendData.push(`Lower Band ${timeframe}`);
      series.push({
        name: `Lower Band ${timeframe}`,
        type: 'line',
        data: alignedLower,
        symbol: 'none',
        lineStyle: { width: 1, type: 'dashed', color: color },
      });
    }

    return {
      title: {
        text: `Rolling VWAP Bands for ${baseData.symbol}`,
        left: 'center',
        textStyle: { color: '#ccc' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: (params: any) => {
          if (!Array.isArray(params) || params.length === 0) {
            return '';
          }

          const dataIndex = params[0].dataIndex;
          const klineItem = baseData.data[dataIndex];

          if (!klineItem) return '';

          const decimalPlaces = this._getDecimalPlaces(klineItem.closePrice);

          const formatDate = (time: number): string =>
            new Date(time).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: 'short',
            });

          const rows = params
            .map((p: any) => {
              const seriesName = p.seriesName;
              const color = (p.color as string) ?? '#ccc';
              const value = parseFloat(p.value);

              if (isNaN(value)) return '';

              const formattedValue = value.toFixed(decimalPlaces);

              return `
                <div style="display:flex;justify-content:space-between;align-items:center;margin:2px 0;">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${color};margin-right:4px;"></span>
                    <span>${seriesName}</span>
                  </div>
                  <span style="color:#ccc;font-weight:bold;">${formattedValue}</span>
                </div>`;
            })
            .join('');

          return `
            <div style="
              background:#2f2f2f;
              color:#f1f1f1;
              padding:10px;
              font-size:13px;
              line-height:1.6;
              box-shadow:0 2px 8px rgba(0,0,0,0.6);
              border-radius:6px;
              min-width:160px;
            ">
              <div><span style="color:#aaa;">Open:</span> ${formatDate(
                klineItem.openTime
              )}</div>
              <div><span style="color:#aaa;">Close:</span> ${formatDate(
                klineItem.closeTime
              )}</div>
              <hr style="border:none;border-top:1px solid #444;margin:6px 0;" />
              ${rows}
            </div>`;
        },
      },
      legend: {
        top: 30,
        textStyle: { color: '#ccc' },
        data: legendData,
      },
      textStyle: { color: '#fff' },
      grid: { top: '70px', left: '50px', right: '50px', bottom: '40px' },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: (value: string) =>
            new Date(Number(value)).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          color: '#ccc',
        },
      },
      yAxis: {
        type: 'value',
        scale: true,
        splitLine: { show: false },
        axisLabel: { color: '#ccc' },
      },
      dataZoom: [{ type: 'inside' }, { show: true, type: 'slider' }],
      series: series,
    };
  }

  /**
   * Получает данные из кэша (IndexedDB) или запрашивает их с сервера.
   */
  private async getOrFetchFromCache<T>(
    dataType: DataType,
    timeframe: TF
  ): Promise<T[] | undefined> {
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

    const updated = (await this.indexedDb.get(key)) as MarketData | undefined;
    return updated?.data as T[];
  }
}
