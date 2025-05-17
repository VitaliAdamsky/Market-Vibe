import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { MarketData } from 'src/app/shared/models/market-data';
import { TableDataRow } from 'src/app/shared/models/table-metrics';
import { OpentInterestData, OpentInterestItem } from 'src/app/shared/models/oi';
import { isValidOpentInterestItemKey } from '../functions/is-valid-oi-item-key';
import { TF } from 'src/app/shared/models/timeframes';

@Injectable({
  providedIn: 'root',
})
export class OiMarketDataService {
  //baseUrl = `${env.renderBaseURL}`;
  baseUrl = 'http://localhost/api';
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler
  ) {}

  buildTableRows(
    data: OpentInterestData[],
    propertyName: string
  ): TableDataRow[] {
    return data.map((entry) => {
      const mappedData = entry.data.map((item: OpentInterestItem) => {
        let colorValue = '';
        let tooltipText = '';

        if (isValidOpentInterestItemKey(propertyName)) {
          switch (propertyName) {
            case 'openInterest':
              colorValue = item.colors.openInterest;
              tooltipText = `Norm. OI: ${item.normalizedOpenInterest}`;
              break;
            case 'openInterestChange':
              colorValue = item.colors.openInterestChange;
              tooltipText = `OI Change: ${item.openInterestChange}%`;
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
          openInterest: item.openInterest,
          openInterestChange: item.openInterestChange,
          normalizedOpenInterest: item.normalizedOpenInterest,
          imageUrl: entry.imageUrl,
          colors: item.colors,
          symbol: entry.symbol,
          exchanges: entry.exchanges, // ✅ Use correct field name
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
