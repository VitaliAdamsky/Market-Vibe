import { Component, ElementRef, ViewChild } from '@angular/core';
import { MarketActivityStats } from '../shared/models/market-activity-stats';
import { MarketActivityService } from './services/market-activity.service';
import { TF } from '../shared/models/timeframes';

@Component({
  selector: 'app-market-activity',
  templateUrl: './market-activity.component.html',
  styleUrls: ['./market-activity.component.css'],
})
export class MarketActivityComponent {
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  TF = TF;
  selectedTab = 0;
  title = 'Market Activity';

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
