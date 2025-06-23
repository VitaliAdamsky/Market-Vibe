import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, map } from 'rxjs';

import { InfoModalComponent } from '../shared/info-modal/info-modal.component';
import { TableDataRow } from '../shared/models/table-metrics';
import { TF } from '../shared/models/timeframes';
import { MetricService } from '../shared/services/metric.service';
import { KlineMarketDataService } from './services/kline-market-data.service';
import { MarketDataService } from '../shared/services/market-data/market-data.service';
import { KlineData } from '../shared/models/kline';

@Component({
  selector: 'app-kline',
  templateUrl: './kline.component.html',
  styleUrls: ['./kline.component.css'],
})
export class KlineComponent implements OnDestroy, OnInit {
  title!: string;
  tableData: { label: string; tableData: TableDataRow[] } = {
    label: '',
    tableData: [],
  };
  timeframe: TF = TF.h4;
  metric = '';

  private subscription = new Subscription();

  constructor(
    private klineMarketDataService: KlineMarketDataService,
    private metricService: MetricService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private marketDataService: MarketDataService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.metric = params['metric'] || 'closePrice';
      this.timeframe = params['timeframe'] || TF.h4;

      this.metricService.changeMetricByPropertyNameAndTimeframe(
        this.metric,
        this.timeframe
      );
    });
  }

  ngOnInit(): void {
    // Subscribe to metric changes + load data accordingly
    this.subscription.add(
      this.metricService.currentMetric$
        .pipe(
          switchMap((metric) => {
            this.timeframe = metric.timeframe || TF.h4;
            return this.marketDataService
              .getMarketData('kline', this.timeframe)
              .pipe(
                map((data) => data as KlineData[]),
                map((data) =>
                  this.klineMarketDataService.buildTableRows(
                    data,
                    metric.propertyName
                  )
                )
              );
          })
        )
        .subscribe({
          next: (tableData) => {
            // Corrected switch block
            console.log(
              'METRIC',
              this.metricService.getCurrentMetric().propertyName
            );
            switch (this.metricService.getCurrentMetric().propertyName) {
              case 'closePrice':
                this.title = 'Close Price';
                break;
              case 'closePriceChange':
                this.title = 'Close Price Change';
                break;
              case 'quoteVolume':
                this.title = 'Volume';
                break;
              case 'quoteVolumeChange':
                this.title = 'Volume Change';
                break;
              case 'buyerRatio':
                this.title = 'Buyer Ratio';
                break;
              case 'buyerRatioChange':
                this.title = 'Buyer Ratio Change';
                break;
              case 'volumeDelta':
                this.title = 'Volume Delta';
                break;
              case 'volumeDeltaChange':
                this.title = 'Volume Delta Change';
                break;
              case 'perpSpotDiff':
                this.title = 'Perp Spot Diff';
                break;
              default:
                this.title = 'Close Price';
            }
            console.log('TITLE', this.title);
            this.tableData = {
              label: this.metricService.getCurrentMetric().title,
              tableData,
            };
            console.log(this.tableData);
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
