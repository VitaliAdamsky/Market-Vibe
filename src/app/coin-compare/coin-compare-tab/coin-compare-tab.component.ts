import { EChartsOption } from 'echarts';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { COIN_METRICS } from 'src/consts/url-consts';
import { Coin } from 'src/app/shared/models/coin';
import { TF } from 'src/app/shared/models/timeframes';
import { CoinCompareBuilderService } from '../services/coin-compare-builder.service';

@Component({
  selector: 'app-coin-compare-tab',
  templateUrl: './coin-compare-tab.component.html',
  styleUrls: ['./coin-compare-tab.component.css'],
})
export class CoinCompareTabComponent implements OnInit, OnDestroy {
  @Input() timeframe!: TF;
  @Input() coins: Coin[] = [];

  title = `Timeframe ${this.timeframe}`;

  subscribtion: Subscription = new Subscription();
  oiChartOptions!: EChartsOption | null;
  closePriceChartOptions!: EChartsOption | null;
  volumeChartOptions!: EChartsOption | null;
  volumeDeltaChartOptions!: EChartsOption | null;
  buyerRatioChartOptions!: EChartsOption | null;
  frChartOptions!: EChartsOption | null;

  constructor(
    private router: Router,
    private chartService: CoinCompareBuilderService
  ) {}

  ngOnInit(): void {
    this.loadCharts();
  }

  async loadCharts() {
    this.oiChartOptions = await this.chartService.buildMetricChart(
      this.coins,
      this.timeframe,
      {
        type: 'oi',
        title: 'Open Interest',
        valueKey: 'normalizedOpenInterest',
        tooltipKey: 'openInterestChange',
      }
    );
    this.closePriceChartOptions = await this.chartService.buildMetricChart(
      this.coins,
      this.timeframe,
      {
        type: 'kline',
        title: 'Close Price',
        valueKey: 'normalizedClosePrice',
        tooltipKey: 'closePriceChange',
      }
    );
    this.volumeChartOptions = await this.chartService.buildMetricChart(
      this.coins,
      this.timeframe,
      {
        type: 'kline',
        title: 'Quote Volume',
        valueKey: 'normalizedQuoteVolume',
        tooltipKey: 'quoteVolumeChange',
      }
    );
    this.volumeDeltaChartOptions = await this.chartService.buildMetricChart(
      this.coins,
      this.timeframe,
      {
        type: 'kline',
        title: 'Volume Delta',
        valueKey: 'normalizedVolumeDelta',
        tooltipKey: 'volumeDeltaChange',
      }
    );
    this.buyerRatioChartOptions = await this.chartService.buildMetricChart(
      this.coins,
      this.timeframe,
      {
        type: 'kline',
        title: 'Buyer Ratio',
        valueKey: 'normalizedBuyerRatio',
        tooltipKey: 'buyerRatioChange',
      }
    );
    this.frChartOptions = await this.chartService.buildMetricChart(
      this.coins,
      this.timeframe,
      {
        type: 'fr',
        title: 'Funding Rate',
        valueKey: 'normalizedFundingRate',
        tooltipKey: 'fundingRateChange',
      }
    );
  }

  onGoToMetrics(coin: Coin) {
    const url = this.router
      .createUrlTree([COIN_METRICS], {
        queryParams: {
          symbol: coin.symbol,
          timeframe: this.timeframe,
          imageUrl: encodeURIComponent(coin.imageUrl),
        },
      })
      .toString();

    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
