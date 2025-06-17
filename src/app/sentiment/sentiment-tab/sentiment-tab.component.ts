import { Component, Input } from '@angular/core';
import { MarketActivityStats } from 'src/app/shared/models/market-activity-stats';
import { TF } from 'src/app/shared/models/timeframes';

@Component({
  selector: 'app-sentiment-tab',
  templateUrl: './sentiment-tab.component.html',
  styleUrls: ['./sentiment-tab.component.css'],
})
export class SentimentTabComponent {
  @Input() timeframe!: TF;
  @Input() data: MarketActivityStats[] = [];
  constructor() {}
}
