import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TF } from 'src/app/shared/models/timeframes';
import { NormalizedMetricsChartService } from '../services/normalized-coin-metrics.service';
import { ChartResult } from 'src/app/shared/models/chart-result';

@Component({
  selector: 'app-coin-metrics-tab',
  templateUrl: './coin-metrics-tab.component.html',
  styleUrls: ['./coin-metrics-tab.component.css'],
})
export class CoinMetricsTabComponent implements OnInit {
  @Input() timeframe: TF = TF.h4;
  @Input() symbol!: string;
  chartData!: ChartResult | null;

  constructor(private metricsChartService: NormalizedMetricsChartService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  async loadChart() {
    this.chartData = await this.metricsChartService.buildNormalizedChart(
      this.symbol,
      this.timeframe
    );
  }
}
