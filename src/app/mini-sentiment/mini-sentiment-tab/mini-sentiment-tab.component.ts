import { Component, Input } from '@angular/core';
import { MarketActivityStats } from 'src/app/shared/models/market-activity-stats';
import { TF } from 'src/app/shared/models/timeframes';

@Component({
  selector: 'app-mini-sentiment-tab',
  templateUrl: './mini-sentiment-tab.component.html',
  styleUrls: ['./mini-sentiment-tab.component.css'],
})
export class MiniSentimentTabComponent {
  @Input() timeframe!: TF;
  @Input() data: MarketActivityStats[] = [];
  constructor() {}
}
