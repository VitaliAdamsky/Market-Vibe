import { Injectable } from '@angular/core';

import { MarketData } from 'src/app/shared/models/market-data';
import { OpenInterestData, OpenInterestItem } from 'src/app/shared/models/oi';
import { KlineData } from 'src/app/shared/models/kline';
import { DataType } from 'src/app/shared/models/data-type';
import { TF } from 'src/app/shared/models/timeframes';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';

import {
  KlineReport,
  KlineReportItem,
} from 'src/app/shared/models/kline-report';
import { Coin } from 'src/app/shared/models/coin';
import { FundingRateData } from 'src/app/shared/models/fr';
import { FrReport, FrReportItem } from 'src/app/shared/models/fr-report';
import { UnixToNamedTimeRu } from 'src/app/utils/time-converter';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(
    private indexedDb: IndexedDbService,
    private marketDataService: MarketDataService
  ) {}

  async createKlineReport(
    timeframe: TF,
    coins: Coin[]
  ): Promise<KlineReport[]> {
    // Параллельно забираем сырые данные из кеша
    const [klineRaw, oiRaw]: [MarketData, MarketData] = await Promise.all([
      this.getOrFetchFromCache('kline', timeframe),
      this.getOrFetchFromCache('oi', timeframe),
    ]);

    const klineData = klineRaw.data as KlineData[];
    const oiData = oiRaw.data as OpenInterestData[];

    const reports: KlineReport[] = [];

    for (const coin of coins) {
      // Находим kline и oi для конкретного coin.symbol
      const kline = klineData.find((k) => k.symbol === coin.symbol);
      const oi = oiData.find((o) => o.symbol === coin.symbol);

      if (!kline || !oi) {
        // Если данных нет — просто пропускаем
        continue;
      }

      // Собираем Map для быстрого поиска OpenInterest по openTime
      const oiMap = new Map<number, OpenInterestItem>();
      for (const oiItem of oi.data) {
        oiMap.set(oiItem.openTime, oiItem);
      }

      // Формируем массив отчётов для каждой свечи
      const reportItems: KlineReportItem[] = [];

      for (const kItem of kline.data) {
        const matchingOi = oiMap.get(kItem.openTime);
        if (!matchingOi) {
          // если для свечи нет OpenInterest — пропускаем
          continue;
        }

        reportItems.push({
          openTime: kItem.openTime,
          closeTime: kItem.closeTime,
          closePrice: kItem.closePrice,
          buyerRatio: kItem.buyerRatio,
          buyerRatioChange: kItem.buyerRatioChange,
          quoteVolume: kItem.quoteVolume,
          quoteVolumeChange: kItem.quoteVolumeChange,
          perpSpotDiff: kItem.perpSpotDiff,
          volumeDelta: kItem.volumeDelta,
          volumeDeltaChange: kItem.volumeDeltaChange,
          openInterest: matchingOi.openInterest,
        });
      }

      reports.push({
        timeframe,
        expirationTime: klineRaw.expirationTime,
        coin: coin,
        data: reportItems,
      });
    }

    return reports;
  }

  async createFrReport(coins: Coin[]): Promise<FrReport[]> {
    const timeframe = TF.h2;

    // Получаем данные Funding Rate (fr) для timeframe = h2
    const [frRaw]: [MarketData] = await Promise.all([
      this.getOrFetchFromCache('fr', timeframe),
    ]);

    // Все данные FR
    const frData = frRaw.data as FundingRateData[];

    // Множество символов для быстрого поиска
    const symbolSet = new Set(coins.map((c) => c.symbol));

    const reports: FrReport[] = [];

    for (const fr of frData) {
      // Фильтруем только нужные символы
      if (!symbolSet.has(fr.symbol)) continue;

      // Преобразуем данные FundingRateItem в FrReportItem
      const items: FrReportItem[] = fr.data.map((d) => ({
        openTime: d.openTime,
        closeTime: d.closeTime,
        fundingRate: d.fundingRate,
      }));

      reports.push({
        expirationTime: frRaw.expirationTime,
        symbol: fr.symbol,
        data: items,
      });
    }

    return reports;
  }

  async exportMarketDataFile(timeframe: TF, coins: Coin[]) {
    // Получаем отчёты
    const [klineReports, frReports] = await Promise.all([
      this.createKlineReport(timeframe, coins),
      this.createFrReport(coins),
    ]);

    // Берём expirationTime из klineReports, либо из frReports, либо текущий timestamp
    const expirationTime =
      klineReports.length > 0
        ? klineReports[0].expirationTime
        : frReports.length > 0
        ? frReports[0].expirationTime
        : Date.now();

    // Формируем итоговый объект
    const exportData = {
      kline: klineReports,
      fundingRate: frReports,
    };

    // Превращаем в JSON строку с отступами
    const jsonString = JSON.stringify(exportData, null, 2);

    // Создаём Blob из JSON
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Создаём ссылку для скачивания
    const url = URL.createObjectURL(blob);

    // Создаём временный элемент <a> для клика
    const a = document.createElement('a');
    a.href = url;
    a.download = `Market-Data-tf-${timeframe}-exp-date-${UnixToNamedTimeRu(
      expirationTime
    )}.json`;
    document.body.appendChild(a);
    a.click();

    // Чистим за собой
    a.remove();
    URL.revokeObjectURL(url);
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
