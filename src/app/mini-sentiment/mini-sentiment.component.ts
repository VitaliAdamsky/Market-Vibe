import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TF } from '../shared/models/timeframes';
import { SentimentService } from './services/sentiment.service';
import { MarketActivityStats } from '../shared/models/market-activity-stats';

@Component({
  selector: 'app-mini-sentiment',
  templateUrl: './mini-sentiment.component.html',
  styleUrls: ['./mini-sentiment.component.css'],
})
export class MiniSentimentComponent implements OnInit, OnDestroy {
  timeframe: TF = TF.h4;
  tableData: MarketActivityStats[] = [];
  title = 'Market Mini Sentiment';
  TF = TF;
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

  ngOnDestroy(): void {}
}
