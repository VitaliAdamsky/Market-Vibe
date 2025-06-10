import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError } from 'rxjs';

import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { env } from 'src/environments/environment';
import { Coin } from 'src/app/shared/models/coin';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private coinsUrl = `${env.vercelUtils}/coins/all`;

  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler
  ) {}

  getCoins(): Observable<Coin[]> {
    return this.http.get<{ coins: Coin[] }>(this.coinsUrl).pipe(
      tap((response) => {
        console.log('Coins fetched', response.coins.length);
      }),
      map((response) => response.coins),
      catchError(this.errorHandler.handleError<Coin[]>('Fetching Coins'))
    );
  }
}
