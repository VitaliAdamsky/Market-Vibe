import { OpentInterestData } from '../models/oi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { env } from 'src/environments/environment';
import { TF } from '../models/timeframes';
import { MarketData } from '../models/market-data';
import { TableDataRow } from '../models/table-metrics';
import { isValidOpentInterestItemMetric } from '../functions/is-valid-oi-item-metric-key';

@Injectable({
  providedIn: 'root',
})
export class OiMarketDataService {
  baseUrl = `${env.renderBaseURL}`;
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler
  ) {}

  getOpenInterestTableRows(
    timeframe: TF,
    propertyName: string
  ): Observable<TableDataRow[]> {
    return this.getOpenInterestData(timeframe).pipe(
      map((openInterestArray) => {
        return openInterestArray.map((entry) => {
          const mappedData = entry.data.map((item) => {
            let colorValue = '';
            let tooltipText = '';

            if (isValidOpentInterestItemMetric(propertyName)) {
              switch (propertyName) {
                case 'openInterest':
                  colorValue = item.colors.openInterest;
                  tooltipText = `Norm. OI: ${item.normalizedOpenInterest}`;
                  break;
                case 'openInterestChange':
                  colorValue = item.colors.openInterestChange;
                  tooltipText = `OI Change: ${item.openInterestChange}`;
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
  getOpenInterestData(timeframe: TF): Observable<OpentInterestData[]> {
    return this.http
      .get<MarketData>(this.baseUrl + `/oi?timeframe=${timeframe}`)
      .pipe(
        map((marketData: MarketData) => marketData.data as OpentInterestData[]),
        this.errorHandler.handleError<OpentInterestData[]>(
          'Fetching Open Interest Data'
        )
      );
  }
}
