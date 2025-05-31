import { Component, Input } from '@angular/core';
import { ChartResult } from 'src/app/shared/models/chart-result';

@Component({
  selector: 'app-normalized-metrics-chart',
  templateUrl: './normalized-metrics-chart.component.html',
  styleUrls: ['./normalized-metrics-chart.component.css'],
})
export class NormalizedMetricsChartComponent {
  @Input() chartData!: ChartResult;
}
