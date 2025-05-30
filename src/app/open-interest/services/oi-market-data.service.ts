import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { MarketData } from 'src/app/shared/models/market-data';
import { TableDataRow } from 'src/app/shared/models/table-metrics';
import { OpenInterestData, OpenInterestItem } from 'src/app/shared/models/oi';
import { isValidOpenInterestItemKey } from '../functions/is-valid-oi-item-key';
import { TF } from 'src/app/shared/models/timeframes';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';

@Injectable({
  providedIn: 'root',
})
export class OiMarketDataService {
  //baseUrl = `${env.renderBaseURL}`;
  baseUrl = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler,
    private indexedDbService: IndexedDbService
  ) {}

  buildTableRows(
    data: OpenInterestData[],
    propertyName: string
  ): TableDataRow[] {
    return data.map((entry) => {
      const mappedData = entry.data.map((item: OpenInterestItem) => {
        let colorValue = '';
        let tooltipText = '';

        if (isValidOpenInterestItemKey(propertyName)) {
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
}
