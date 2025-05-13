import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { SnackbarService } from 'src/services/snackbar.service';
import { SnackbarType } from 'src/app/models/shared/snackbar-type';
import { env } from 'src/environments/environment';
import { TF } from '../models/timeframes';
import { OpenInterestTableRow, OpentInterestData } from '../models/oi';
import { FundingRateData } from '../models/fr';
import { MarketData } from '../models/market-data';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  baseUrl = `${env.renderBaseURL}`;
  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler
  ) {}

  getOpenInterestTableRows(timeframe: TF): Observable<OpenInterestTableRow[]> {
    return this.getOpenInterestData(timeframe).pipe(
      map((openInterestArray) => {
        return openInterestArray.flatMap((entry) =>
          entry.data.map((item) => ({
            ...item,
            symbol: entry.symbol,
            imageUrl: entry.imageUrl,
            category: entry.category,
            exchangeList: entry.exchanges,
          }))
        );
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

  getFundingRateData(limit: number): Observable<FundingRateData[]> {
    return this.http.get<MarketData>(this.baseUrl + `/fr?limit=${limit}`).pipe(
      map((marketData: MarketData) => marketData.data as FundingRateData[]),
      this.errorHandler.handleError<FundingRateData[]>(
        'Fetching Open Interest Data'
      )
    );
  }
}
