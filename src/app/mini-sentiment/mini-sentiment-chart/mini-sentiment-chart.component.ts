import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MarketActivityStats } from 'src/app/shared/models/market-activity-stats';
import { PropertyMapping } from '../models/property-mapping';
import { generateDichotomicHeatmap } from '../functions/generate-dichotomic-heatmap';
import { TF } from 'src/app/shared/models/timeframes';
import { DoughnutChartService } from '../services/doughnut-chart.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-mini-sentiment-chart',
  templateUrl: './mini-sentiment-chart.component.html',
  styleUrls: ['./mini-sentiment-chart.component.css'],
})
export class MiniSentimentChartComponent implements OnInit {
  @Input() data: MarketActivityStats[] = [];
  @Input() metricKey!: string;
  @Input() timeframe!: TF;
  title = '';
  echartsOptions!: EChartsOption;
  constructor(private doughnutChartService: DoughnutChartService) {}

  ngOnInit(): void {
    this.title = PropertyMapping[this.metricKey] + ` ${this.timeframe}`;
    this.echartsOptions = this.doughnutChartService.createChart(
      this.data,
      this.metricKey,
      this.timeframe
    );
  }
}
