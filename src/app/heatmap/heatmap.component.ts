import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs/internal/Subscription';
import { OiMarketDataService } from './services/oi-market-data.service';
import { TF } from './models/timeframes';
import { OpentInterestData } from './models/oi';
import { CoinLinksService } from './services/coin-links.service';
import { TableDataRow } from './models/table-metrics';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent {
  subcribtion: Subscription = new Subscription();
  openInterestData: TableDataRow[] = [];
  removedFromBeginningColumns = 4;
  selectedCoin: OpentInterestData | null = null;

  constructor(
    private oiMarketDataService: OiMarketDataService,
    public coinLinksService: CoinLinksService
  ) {
    this.subcribtion.add(
      this.oiMarketDataService
        .getOpenInterestTableRows(TF.h1, 'openInterest')
        .subscribe((data) => {
          this.openInterestData = data;
          console.log(data);
        })
    );
  }
  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  dropRow(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.openInterestData,
      event.previousIndex,
      event.currentIndex
    );
  }
}
