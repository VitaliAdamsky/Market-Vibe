import { Component, Input, OnInit } from '@angular/core';
import { EchartsBuilderService } from '../services/echarts-builder.service';
import { DataType } from 'src/app/shared/models/data-type';
import { KlineDataItem } from 'src/app/shared/models/kline';
import { TF } from 'src/app/shared/models/timeframes';
import { ChartResult } from 'src/app/shared/models/chart-result';

@Component({
  selector: 'app-data-chart-tab',
  templateUrl: './data-chart-tab.component.html',
  styleUrls: ['./data-chart-tab.component.css'],
})
export class DataChartTabComponent implements OnInit {
  @Input() timeframe!: TF;
  @Input() dataType!: DataType;
  @Input() propertyKey?: keyof KlineDataItem;

  searchQuery = '';
  data: ChartResult[] = [];
  filteredData: ChartResult[] = [];
  chartOptions: ChartResult[] = [];
  pageSize = 30;
  page = 0;

  constructor(private echartsBuilder: EchartsBuilderService) {}

  async ngOnInit(): Promise<void> {
    this.data = await this.echartsBuilder.buildChartOptions(
      this.dataType,
      this.timeframe,
      this.propertyKey
    );
    this.filteredData = [...this.data]; // копируем данные
    this.loadMore();
  }

  loadMore(): void {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;

    const nextChunk = this.filteredData.slice(start, end);

    if (nextChunk.length === 0) return;

    this.chartOptions = [...this.chartOptions, ...nextChunk];
    this.page++;
  }

  applySearch(value: string): void {
    this.searchQuery = value;
    this.page = 0;
    this.chartOptions = [];

    const query = value.toLowerCase();

    this.filteredData = this.data.filter((item) =>
      item.symbol?.toLowerCase().includes(query)
    );

    this.loadMore();
  }

  trackByFn(index: number, item: ChartResult) {
    return item.symbol; // или уникальный ID
  }
}
