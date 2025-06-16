import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-aggregator-tab',
  templateUrl: './aggregator-tab.component.html',
  styleUrls: ['./aggregator-tab.component.css'],
})
export class AggregatorTabComponent {
  @Input() chartOptions!: EChartsOption;
}
