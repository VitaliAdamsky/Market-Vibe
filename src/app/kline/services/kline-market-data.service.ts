import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { MarketData } from 'src/app/shared/models/market-data';
import { TableDataRow } from 'src/app/shared/models/table-metrics';
import { env } from 'src/environments/environment';
import { TF } from 'src/app/shared/models/timeframes';
import { KlineData, KlineDataItem } from 'src/app/shared/models/kline';
import { isValidKlineDataItemKey } from '../functions/is-valid-kline-item-key';

@Injectable({
  providedIn: 'root',
})
export class KlineMarketDataService {
  //baseUrl = `${env.renderBaseURL}`;
  baseUrl = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler
  ) {}

  buildTableRows(data: KlineData[], propertyName: string): TableDataRow[] {
    return data.map((entry) => {
      const mappedData = entry.data.map((item: KlineDataItem) => {
        let colorValue = '';
        let tooltipText = '';

        if (isValidKlineDataItemKey(propertyName)) {
          switch (propertyName) {
            case 'volumeDelta':
              colorValue = item.colors.volumeDelta;
              tooltipText = `Norm. Volume Delta: ${item.normalizedVolumeDelta}`;
              break;
            case 'volumeDeltaChange':
              colorValue = item.colors.volumeDeltaChange;
              tooltipText = `Volume Delta Change: ${item.volumeDeltaChange}%`;
              break;
            case 'buyerRatio':
              colorValue = item.colors.buyerRatio;
              tooltipText = `Buyer Ratio Change: ${item.normalizedBuyerRatio}%`;
              break;
            case 'buyerRatioChange':
              colorValue = item.colors.buyerRatioChange;
              tooltipText = `Buyer Ratio Change: ${item.buyerRatioChange}%`;
              break;
            case 'perpSpotDiff':
              colorValue = item.colors.perpSpotDiff;
              tooltipText = `Perp Spot Diff: ${item.perpSpotDiff}`;
              break;
            case 'quoteVolume':
              colorValue = item.colors.quoteVolume;
              tooltipText = `Quote Volume: ${item.normalizedQuoteVolume}`;
              break;
            case 'quoteVolumeChange':
              colorValue = item.colors.quoteVolumeChange;
              tooltipText = `Quote Volume Change: ${item.quoteVolumeChange}%`;
              break;
            case 'closePrice':
              colorValue = item.colors.closePrice;
              tooltipText = `Close Price: ${item.normalizedClosePrice}`;
              break;
            case 'closePriceChange':
              colorValue = item.colors.closePriceChange;
              tooltipText = `Close Price Change: ${item.closePriceChange}%`;
              break;
            default:
              colorValue = '#ccc';
              tooltipText = 'N/A';
          }
        }

        return {
          openTime: item.openTime,
          closeTime: item.closeTime,
          displayedColorValue: colorValue,
          tooltipText,

          // These are optional in TableMetricItem
          perpSpotDiff: item.perpSpotDiff,
          volumeDelta: item.volumeDelta,
          volumeDeltaChange: item.volumeDeltaChange,
          buyerRatio: item.buyerRatio,
          buyerRatioChange: item.buyerRatioChange,
          quoteVolume: item.quoteVolume,
          quoteVolumeChange: item.quoteVolumeChange,
          closePrice: item.closePrice,
          closePriceChange: item.closePriceChange,
          normalizedClosePrice: item.normalizedClosePrice,
          normalizedBuyerRatio: item.normalizedBuyerRatio,
          normalizedQuoteVolume: item.normalizedQuoteVolume,
          normalizedVolumeDelta: item.normalizedVolumeDelta,

          imageUrl: entry.imageUrl,
          colors: item.colors,
          symbol: entry.symbol,
          exchanges: entry.exchanges,
          category: entry.category,
        };
      });

      return {
        symbol: entry.symbol,
        imageUrl: entry.imageUrl,
        category: entry.category,
        exchanges: entry.exchanges, // ✅ This is already correctly set
        data: mappedData,
      };
    });
  }
}
