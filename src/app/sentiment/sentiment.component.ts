import { Component, OnInit } from '@angular/core';
import { TF } from '../shared/models/timeframes';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { SentimentService } from './services/sentiment.service';
import { MarketActivityStats } from '../shared/models/market-activity-stats';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  title = 'Market Sentiment';
  subtitle = '';
  TF = TF;
  selectedTab = 0;
  loadedTabs = [true, false, false, false];

  data1h: MarketActivityStats[] = [];
  data4h: MarketActivityStats[] = [];
  data12h: MarketActivityStats[] = [];
  dataD: MarketActivityStats[] = [];

  constructor(private sentimentService: SentimentService) {}
  async ngOnInit(): Promise<void> {
    this.data1h = await this.sentimentService.getCombinedSymbolStats(TF.h1);
    this.data4h = await this.sentimentService.getCombinedSymbolStats(TF.h4);
    this.data12h = await this.sentimentService.getCombinedSymbolStats(TF.h12);
    this.dataD = await this.sentimentService.getCombinedSymbolStats(TF.D);
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
  onTabChange(event: MatTabChangeEvent): void {
    const index = event.index;
    if (!this.loadedTabs[index]) {
      setTimeout(() => {
        this.loadedTabs[index] = true;
      }, 50);
    }
  }
}
