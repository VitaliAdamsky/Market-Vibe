import { Component, OnInit } from '@angular/core';
import { TF } from '../shared/models/timeframes';
import { FundingRateAggregateService } from './services/fr-aggregate.service';
import { EChartsOption } from 'echarts';
import { AggregateService } from './services/aggregate.service';

@Component({
  selector: 'app-aggregator',
  templateUrl: './aggregator.component.html',
  styleUrls: ['./aggregator.component.css'],
})
export class AggregatorComponent implements OnInit {
  TF = TF;
  chartsOptions1h!: EChartsOption;
  chartsOptions4h!: EChartsOption;
  chartsOptions12h!: EChartsOption;
  chartsOptionsD!: EChartsOption;
  chartsOptionsFR: EChartsOption[] = [];

  constructor(
    private aggregateService: AggregateService,
    private frAggregateService: FundingRateAggregateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.chartsOptions1h = await this.aggregateService.buildAggregatedChart(
      TF.h1
    );
    this.chartsOptions4h = await this.aggregateService.buildAggregatedChart(
      TF.h4
    );
    this.chartsOptions12h = await this.aggregateService.buildAggregatedChart(
      TF.h12
    );
    this.chartsOptionsD = await this.aggregateService.buildAggregatedChart(
      TF.D
    );
    this.chartsOptionsFR = await this.frAggregateService.buildCharts(TF.h2);
    console.log(this.chartsOptionsFR);
  }
}
