import { Component, Input, OnInit } from '@angular/core';
import { ChartResult } from 'src/app/shared/models/chart-result';
import { RollingVwapService } from '../services/rolling-vwap.service';

@Component({
  selector: 'app-rolling-vwap-tab',
  templateUrl: './rolling-vwap-tab.component.html',
  styleUrls: ['./rolling-vwap-tab.component.css'],
})
export class RollingVwapTabComponent implements OnInit {
  @Input() symbol!: string;
  chartData!: ChartResult | null;

  constructor(private rollingVwapService: RollingVwapService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  async loadChart() {
    this.chartData = await this.rollingVwapService.buildVwapChart(this.symbol);
  }
}
