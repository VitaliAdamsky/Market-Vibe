import { Injectable } from '@angular/core';
import { FundingRateData, FundingRateItem } from 'src/app/shared/models/fr';
import { KlineData, KlineDataItem } from 'src/app/shared/models/kline';
import { OpenInterestData, OpenInterestItem } from 'src/app/shared/models/oi';
import { MarketActivityStats } from 'src/app/shared/models/market-activity-stats';

import { TF } from 'src/app/shared/models/timeframes';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { MarketData } from 'src/app/shared/models/market-data';

@Injectable({ providedIn: 'root' })
export class MarketActivityService {
  constructor(private indexedDb: IndexedDbService) {}

  async getCombinedSymbolStats(timeframe: TF): Promise<MarketActivityStats[]> {
    const frKey = `fr-${timeframe}`;
    const oiKey = `oi-${timeframe}`;
    const klineKey = `kline-${timeframe}`;

    const [frRaw, oiRaw, klineRaw]: [MarketData?, MarketData?, MarketData?] =
      await Promise.all([
        this.indexedDb.get(frKey),
        this.indexedDb.get(oiKey),
        this.indexedDb.get(klineKey),
      ]);

    const frLatest = new Map<
      string,
      { meta: FundingRateData; item: FundingRateItem }
    >();
    const oiLatest = new Map<
      string,
      { meta: OpenInterestData; item: OpenInterestItem }
    >();
    const klLatest = new Map<
      string,
      { meta: KlineData; item: KlineDataItem }
    >();

    // Funding Rate
    if (frRaw?.dataType === 'fr') {
      for (const entry of frRaw.data as FundingRateData[]) {
        const last = entry.data.at(-1);
        if (last) frLatest.set(entry.symbol, { meta: entry, item: last });
      }
    }

    // Open Interest
    if (oiRaw?.dataType === 'oi') {
      for (const entry of oiRaw.data as OpenInterestData[]) {
        const last = entry.data.at(-1);
        if (last) oiLatest.set(entry.symbol, { meta: entry, item: last });
      }
    }

    // Kline
    if (klineRaw?.dataType === 'kline') {
      for (const entry of klineRaw.data as KlineData[]) {
        const last = entry.data.at(-1);
        if (last) klLatest.set(entry.symbol, { meta: entry, item: last });
      }
    }

    const allSymbols = new Set<string>([
      ...frLatest.keys(),
      ...oiLatest.keys(),
      ...klLatest.keys(),
    ]);

    const result: MarketActivityStats[] = [];

    for (const symbol of allSymbols) {
      const frData = frLatest.get(symbol);
      const oiData = oiLatest.get(symbol);
      const klData = klLatest.get(symbol);

      if (!klData) continue;

      const { item: kl, meta: klMeta } = klData;
      const fr = frData?.item;
      const oi = oiData?.item;

      result.push({
        symbol,
        openTime: kl.openTime,
        closeTime: kl.closeTime,
        fundingRateChange: fr?.fundingRateChange ?? 0,
        openInterestChange: oi?.openInterestChange ?? 0,
        volumeChange: kl.quoteVolumeChange ?? 0,
        volumeDeltaChange: kl.volumeDeltaChange ?? 0,
        closePriceChange: kl.closePriceChange ?? 0,
        perpSpotDiff: kl.perpSpotDiff ?? 0,
        buyerRatioChange: kl.buyerRatioChange ?? 0,

        // Metadata
        exchanges:
          klMeta.exchanges ??
          frData?.meta.exchanges ??
          oiData?.meta.exchanges ??
          [],
        imageUrl:
          klMeta.imageUrl ??
          frData?.meta.imageUrl ??
          oiData?.meta.imageUrl ??
          '',
        category:
          klMeta.category ??
          frData?.meta.category ??
          oiData?.meta.category ??
          '',
      });
    }

    return result;
  }
}
