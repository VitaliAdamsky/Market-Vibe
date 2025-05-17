import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { env } from 'src/environments/environment';
import { TF } from '../models/timeframes';
import { MarketData } from '../models/market-data';
import { TableDataRow } from '../models/table-metrics';
import { KlineData } from '../models/kline';
import { isValidKlineItemKey } from '../../funding-rate/functions/is-valid-kline-item-key';

@Injectable({
  providedIn: 'root',
})
export class KlineMarketDataService {
  baseUrl = `${env.renderBaseURL}`;
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler
  ) {}

  getKlineTableRows(
    timeframe: TF,
    propertyName: string
  ): Observable<TableDataRow[]> {
    return this.getKlineData(timeframe).pipe(
      map((klineArray) => {
        return klineArray.map((entry) => {
          const mappedData = entry.data.map((item) => {
            let colorValue = '';
            let tooltipText = '';

            if (isValidKlineItemKey(propertyName)) {
              switch (propertyName) {
                case 'closePrice': //👈
                  colorValue = item.colors.closePrice;
                  tooltipText = `Norm. Close Price: ${item.normalizedClosePrice}`;
                  break;
                case 'closePriceChange':
                  colorValue = item.colors.closePriceChange;
                  tooltipText = `Close Price Change: ${item.closePriceChange}`;
                  break;
                case 'quoteVolume': //👈
                  colorValue = item.colors.quoteVolume;
                  tooltipText = `Quote Volume: ${item.normalizedQuoteVolume}`;
                  break;
                case 'quoteVolumeChange': //👈
                  colorValue = item.colors.quoteVolumeChange;
                  tooltipText = `Quote Volume Change: ${item.quoteVolumeChange}`;
                  break;
                case 'buyerRatio': //👈
                  colorValue = item.colors.buyerRatio;
                  tooltipText = `Buyer Ratio: ${item.buyerRatio}`;
                  break;
                case 'buyerRatioChange': //👈
                  colorValue = item.colors.buyerRatioChange;
                  tooltipText = `Buyer Ratio Change: ${item.buyerRatioChange}`;
                  break;
                case 'volumeDelta': //👈
                  colorValue = item.colors.volumeDelta;
                  tooltipText = `Volume Delta: ${item.normalizedVolumeDelta}`;
                  break;
                case 'volumeDeltaChange': //👈
                  colorValue = item.colors.volumeDeltaChange;
                  tooltipText = `Volume Delta Change: ${item.volumeDeltaChange}`;
                  break;
                case 'perpSpotDiff': //👈
                  colorValue = item.colors.perpSpotDiff;
                  tooltipText = `Perp Spot Diff: ${item.perpSpotDiff}`;
                  break;

                default:
                  colorValue = '';
                  tooltipText = '';
              }
            }

            return {
              openTime: item.openTime,
              displayedColorValue: colorValue,
              tooltipText,
            };
          });

          return {
            symbol: entry.symbol,
            imageUrl: entry.imageUrl,
            category: entry.category,
            exchanges: entry.exchanges,
            data: mappedData,
          };
        });
      })
    );
  }

  getKlineData(timeframe: TF): Observable<KlineData[]> {
    return this.http
      .get<MarketData>(this.baseUrl + `/kline?timeframe=${timeframe}`)
      .pipe(
        map((marketData: MarketData) => marketData.data as KlineData[]),
        this.errorHandler.handleError<KlineData[]>(
          'Fetching Open Interest Data'
        )
      );
  }
}
