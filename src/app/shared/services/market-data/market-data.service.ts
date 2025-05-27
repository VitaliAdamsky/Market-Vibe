import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { MarketData } from '../../models/market-data';
import { TF } from '../../models/timeframes';
import { IndexedDbService } from './idexdb.service';
import { DataType } from '../../models/data-type';

@Injectable({ providedIn: 'root' })
export class MarketDataService {
  baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler,
    private indexedDb: IndexedDbService
  ) {}

  getMarketData<T>(dataType: DataType, timeframe: TF): Observable<T[]> {
    const key = `${dataType}-${timeframe}`;
    const now = Date.now();

    return new Observable<T[]>((observer) => {
      this.indexedDb.get(key).then((cached) => {
        const marketData = cached as MarketData;
        if (marketData && now < marketData.expirationTime) {
          console.log('Cache hit for', key);
          observer.next(marketData.data as T[]);
          observer.complete();
        } else {
          console.log('Cache miss for', key);
          this.http
            .get<MarketData>(
              `${this.baseUrl}/${dataType}?timeframe=${timeframe}`
            )
            .pipe(
              this.errorHandler.handleError<MarketData>('Fetching Market Data')
            )
            .subscribe((response) => {
              this.indexedDb.set(key, response);
              observer.next(response.data as T[]);
              observer.complete();
            });
        }
      });
    });
  }
}
