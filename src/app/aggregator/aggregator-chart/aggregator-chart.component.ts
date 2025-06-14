import { Component, Input, OnInit } from '@angular/core';
import { TF } from 'src/app/shared/models/timeframes';
import { AggregateService } from '../services/aggregate.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-aggregator-chart',
  templateUrl: './aggregator-chart.component.html',
  styleUrls: ['./aggregator-chart.component.css'],
})
export class AggregatorChartComponent {
  @Input() chartOptions!: EChartsOption;
}
