import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs/internal/Subscription';
import { MarketService } from './services/market-data.service';
import { MarketData } from './models/market-data';
import { TF } from './models/timeframes';
import { OpenInterestTableRow, OpentInterestData } from './models/oi';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent {
  subcribtion: Subscription = new Subscription();
  openInterestData: OpentInterestData[] = [];
  removedFromBeginningColumns = 4;
  constructor(private marketService: MarketService) {
    this.subcribtion.add(
      this.marketService.getOpenInterestData(TF.h1).subscribe((data) => {
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
