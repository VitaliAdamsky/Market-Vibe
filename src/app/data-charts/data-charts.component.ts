import { Component } from '@angular/core';
import { EchartsBuilderService } from './services/echarts-builder.service';

import { ActivatedRoute } from '@angular/router';
import { getChartHeader } from './functions/get-chart-header';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.css'],
})
export class DataChartsComponent {
  header = '';
  subheader = '';
  fullData: any[] = [];
  chartOptions: any[] = [];
  filteredData: any[] = [];

  pageSize = 30;
  page = 0;

  searchQuery = '';

  constructor(
    private echartsBuilder: EchartsBuilderService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      const dataType = params['dataType'] || 'oi';
      const timeframe = params['timeframe'] || 'h4';
      const propertyKey = params['propertyKey'] || undefined;

      this.fullData = await this.echartsBuilder.buildChartOptions(
        dataType,
        timeframe,
        propertyKey
      );
      this.filteredData = this.fullData;
      this.loadMore();
      this.header = getChartHeader(dataType, propertyKey);
      this.subheader = dataType === 'fr' ? '' : `Timeframe ${timeframe}`;
    });
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
