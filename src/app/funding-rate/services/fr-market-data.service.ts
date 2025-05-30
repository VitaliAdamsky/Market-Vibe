import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  FundingRateData,
  FundingRateItem,
  GroupedFundingRateData,
} from 'src/app/shared/models/fr';
import {
  TableDataRow,
  TableMetricItem,
} from 'src/app/shared/models/table-metrics';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { env } from 'src/environments/environment';
import { getClosestInterval } from '../functions/get-closest-interval';
import { isValidFundingRateItemKey } from '../functions/is-valid-fr-item-key';
import { MarketDataService } from 'src/app/shared/services/market-data/market-data.service';
import { TF } from 'src/app/shared/models/timeframes';

@Injectable({
  providedIn: 'root',
})
export class FrMarketDataService {
  //private readonly apiUrl = `${env.renderBaseURL}/api/fr`;
  private readonly apiUrl = `http://localhost:3000/api/fr`;

  constructor(
    private errorHandler: HttpErrorHandler,
    private marketDataService: MarketDataService
  ) {}

  buildTableRows(
    data: FundingRateData[],
    propertyName: string
  ): TableDataRow[] {
    return data.map((entry, index) => {
      const rowData = entry.data.map((item: FundingRateItem) => {
        let colorValue = '';
        let tooltipText = '';

        if (isValidFundingRateItemKey(propertyName)) {
          switch (propertyName) {
            case 'fundingRate':
              colorValue = item.colors.fundingRate;
              tooltipText = `Norm. FR: ${item.normalizedFundingRate}`;
              break;

            case 'fundingRateChange':
              colorValue = item.colors.fundingRateChange;
              tooltipText = `FR Change: ${item.fundingRateChange}%`;
              break;

            default:
              colorValue = '#ccc';
              tooltipText = 'N/A';
          }
        }

        // Build each cell's data
        return {
          tooltipText,
          openTime: item.openTime,
          closeTime: item.closeTime,
          fundingRate: item.fundingRate,
          fundingRateChange: item.fundingRateChange,
          normalizedFundingRate: item.normalizedFundingRate,
          displayedColorValue: colorValue,
          exchanges: data[index].exchanges,
          symbol: data[index].symbol,
          imageUrl: data[index].imageUrl,
        } satisfies TableMetricItem;
      });

      // Return full row
      return {
        symbol: entry.symbol,
        imageUrl: entry.imageUrl,
        category: entry.category,
        exchanges: entry.exchanges,
        data: rowData,
      } satisfies TableDataRow;
    });
  }

  getGroupedFundingRateData(): Observable<GroupedFundingRateData[]> {
    return this.marketDataService.getMarketData('fr', TF.h2).pipe(
      map((data) => data as FundingRateData[]),
      map((data) => this.groupByInterval(data)),
      this.errorHandler.handleError<GroupedFundingRateData[]>(
        'Fetching & grouping funding rate data'
      )
    );
  }

  groupByInterval(dataArray: FundingRateData[]): GroupedFundingRateData[] {
    const map = new Map<number, FundingRateData[]>();

    dataArray.forEach((coin) => {
      coin.data.forEach((item) => {
        const intervalMs = item.closeTime - item.openTime;
        const intervalMin = Math.round(intervalMs / 60000); // ms → minutes

        // Skip invalid intervals
        if (intervalMin <= 0 || intervalMin > 24 * 60) {
          console.warn(`Invalid interval for ${coin.symbol}:`, item);
          return;
        }

        const logicalInterval = getClosestInterval(intervalMin);

        if (!map.has(logicalInterval)) {
          map.set(logicalInterval, []);
        }

        const bucket = map.get(logicalInterval)!;

        // Add item to existing coin or push new one
        const existingCoin = bucket.find((c) => c.symbol === coin.symbol);
        if (existingCoin) {
          existingCoin.data.push(item);
        } else {
          map.get(logicalInterval)?.push({ ...coin, data: [item] });
        }
      });
    });

    // Convert Map to array and sort
    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([intervalMin, coins]) => ({
        label: `Timeframe ${intervalMin / 60}h`,
        intervalMin,
        data: coins,
      }));
  }
}
