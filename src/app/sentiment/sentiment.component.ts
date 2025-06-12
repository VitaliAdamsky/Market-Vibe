import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TF } from '../shared/models/timeframes';
import { SentimentService } from './services/sentiment.service';
import { MarketActivityStats } from '../shared/models/market-activity-stats';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit, OnDestroy {
  timeframe: TF = TF.h4;
  tableData: MarketActivityStats[] = [];
  title = 'Market Sentiment';
  subtitle = `Timeframe ${this.timeframe}`;

  constructor(
    private route: ActivatedRoute,
    private sentimentService: SentimentService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.timeframe = params['timeframe'] || TF.h4;
    });
  }

  async ngOnInit(): Promise<void> {
    this.tableData = await this.sentimentService.getCombinedSymbolStats(
      this.timeframe
    );
    console.log(this.tableData);
  }

  ngOnDestroy(): void {}
}
