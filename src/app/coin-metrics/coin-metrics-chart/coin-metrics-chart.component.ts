import { Component, Input } from '@angular/core';
import { ChartResult } from 'src/app/shared/models/chart-result';

@Component({
  selector: 'app-coin-metrics-chart',
  templateUrl: './coin-metrics-chart.component.html',
  styleUrls: ['./coin-metrics-chart.component.css'],
})
export class CoinMetricsChartComponent {
  @Input() chartData!: ChartResult;
}
