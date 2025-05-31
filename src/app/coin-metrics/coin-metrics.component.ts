import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { CoinMetricsBuilderService } from './services/coin-metrics-builder.service';
import { ChartResult } from '../shared/models/chart-result';
import { TF } from '../shared/models/timeframes';
import { NormalizedMetricsChartService } from './services/normalized-coin-metrics.service';

@Component({
  selector: 'app-coin-metrics',
  templateUrl: './coin-metrics.component.html',
  styleUrls: ['./coin-metrics.component.css'],
})
export class CoinMetricsComponent implements OnInit {
  constructor(
    private normalizedMetricsChartService: NormalizedMetricsChartService,
    private route: ActivatedRoute,
    private coinMetricsBuilder: CoinMetricsBuilderService
  ) {}
  symbol = '';
  timeframe!: TF;
  imageUrl = '';

  oiEchartOptoins!: ChartResult | null;
  frEchartOptoins!: ChartResult | null;
  quoteVolumeEchartOptoins!: ChartResult | null;
  buyerRatioEchartOptoins!: ChartResult | null;
  volumeDeltaEchartOptoins!: ChartResult | null;
  closePriceEchartOptoins!: ChartResult | null;
  normalizedEchartOptoins!: ChartResult | null;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.symbol = params['symbol'] || 'BTCUSDT';
      this.timeframe = (params['timeframe'] as TF) || TF;
      this.imageUrl = params['imageUrl'] || 'assets/logo/btc.svg';

      this.loadCharts();
    });
  }

  async loadCharts() {
    this.oiEchartOptoins = await this.coinMetricsBuilder.buildChartOptions(
      this.symbol,
      'oi',
      this.timeframe
    );

    this.frEchartOptoins = await this.coinMetricsBuilder.buildChartOptions(
      this.symbol,
      'fr',
      this.timeframe
    );

    this.quoteVolumeEchartOptoins =
      await this.coinMetricsBuilder.buildChartOptions(
        this.symbol,
        'kline',
        this.timeframe,
        'quoteVolume'
      );

    this.buyerRatioEchartOptoins =
      await this.coinMetricsBuilder.buildChartOptions(
        this.symbol,
        'kline',
        this.timeframe,
        'buyerRatio'
      );

    this.volumeDeltaEchartOptoins =
      await this.coinMetricsBuilder.buildChartOptions(
        this.symbol,
        'kline',
        this.timeframe,
        'volumeDelta'
      );

    this.closePriceEchartOptoins =
      await this.coinMetricsBuilder.buildChartOptions(
        this.symbol,
        'kline',
        this.timeframe,
        'closePrice'
      );

    this.normalizedEchartOptoins =
      await this.normalizedMetricsChartService.buildNormalizedChart(
        this.symbol,
        this.timeframe
      );
  }
}
