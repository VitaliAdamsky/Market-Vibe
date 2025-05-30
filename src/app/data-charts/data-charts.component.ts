import { Component } from '@angular/core';
import { EchartsBuilderService } from './services/echarts-builder.service';
import { TF } from '../shared/models/timeframes';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.css'],
})
export class DataChartsComponent {
  fullData: any[] = [];
  chartOptions: any[] = [];
  filteredData: any[] = [];

  pageSize = 30;
  page = 0;

  searchQuery = '';

  constructor(private echartsBuilder: EchartsBuilderService) {}

  async ngOnInit() {
    this.fullData = await this.echartsBuilder.buildEchartsOptionsForOI(TF.h4);
    this.filteredData = this.fullData;
    this.loadMore();
  }

  loadMore() {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;

    const nextChunk = this.filteredData.slice(start, end);
    this.chartOptions = [...this.chartOptions, ...nextChunk];
    this.page++;
  }

  applySearch(value: string) {
    this.searchQuery = value; // sync just in case
    this.page = 0;

    const query = value.toLowerCase();

    this.filteredData = this.fullData.filter((option) =>
      option.symbol?.toLowerCase().includes(query)
    );

    this.chartOptions = [];
    this.loadMore();
  }
}
