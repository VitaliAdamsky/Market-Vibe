import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Subscription, switchMap } from 'rxjs';

import { InfoModalComponent } from '../shared/info-modal/info-modal.component';
import { TableDataRow } from '../shared/models/table-metrics';
import { MetricService } from '../shared/services/metric.service';
import { OiMarketDataService } from './services/oi-market-data.service';
import { TF } from '../shared/models/timeframes';
import { ActivatedRoute } from '@angular/router';
import { MarketDataService } from '../shared/services/market-data/market-data.service';
import { OpentInterestData } from '../shared/models/oi';

@Component({
  selector: 'app-open-interest',
  templateUrl: './open-interest.component.html',
  styleUrls: ['./open-interest.component.css'],
})
export class OpenInterestComponent implements OnDestroy {
  title = 'Open Interest';
  tableData: { label: string; tableData: TableDataRow[] } = {
    label: '',
    tableData: [],
  };
  timeframe: TF = TF.h4;
  metric = '';

  private subscription = new Subscription();

  constructor(
    private oiMarketDataService: OiMarketDataService,
    private marketDataService: MarketDataService,
    private metricService: MetricService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.metric = params['metric'] || 'openInterest';
      this.timeframe = params['timeframe'] || TF.h4;
      this.metricService.changeMetricByPropertyNameAndTimeframe(
        this.metric,
        this.timeframe
      );
    });

    // Subscribe to metric changes + load data accordingly
    this.subscription.add(
      this.metricService.currentMetric$
        .pipe(
          switchMap((metric) => {
            this.timeframe = metric.timeframe || TF.h4;
            return this.marketDataService
              .getMarketData('oi', this.timeframe)
              .pipe(
                map((data) => data as OpentInterestData[]),
                map((data) =>
                  this.oiMarketDataService.buildTableRows(
                    data,
                    metric.propertyName
                  )
                )
              );
          })
        )
        .subscribe({
          next: (tableData) => {
            this.title =
              this.metricService.getCurrentMetric().propertyName ===
              'openInterest'
                ? 'Open Interest'
                : 'Open Interest Change';
            this.tableData = {
              label: this.metricService.getCurrentMetric().title,
              tableData,
            };
          },
          error: (err) => {
            console.error('Error loading Open Interest data:', err);
            this.tableData = { label: '', tableData: [] };
          },
        })
    );
  }

  openInfoModal() {
    this.metricService.changeMetricByPropertyNameAndTimeframe(
      this.metric,
      this.timeframe
    );
    console.log(this.metricService.getCurrentMetric());
    this.dialog.open(InfoModalComponent, {
      data: this.metricService.getCurrentMetric(),
      width: '70vw',
      panelClass: 'full-screen-dialog',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
