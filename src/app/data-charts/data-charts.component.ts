import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataType } from '../shared/models/data-type';
import { KlineDataItem } from '../shared/models/kline';
import { TF } from '../shared/models/timeframes';
import { LABELS_MAP } from '../shared/functions/labels-map';
import { getChartHeader } from './functions/get-chart-header';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.css'],
})
export class DataChartsComponent implements OnInit {
  TF = TF;
  header = '';
  dataType!: DataType;
  timeframe!: TF;
  propertyKey!: keyof KlineDataItem | undefined;
  selectedTab = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.dataType = params['dataType'] || 'oi';
      this.propertyKey = params['propertyKey']
        ? params['propertyKey']
        : undefined;

      // Пример установки заголовков
      this.header = getChartHeader(this.dataType, this.propertyKey);
    });
  }

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
