import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrMarketDataService } from './services/fr-market-data.service';
import { TableDataRow } from '../shared/models/table-metrics';
import { MetricService } from '../shared/services/metric.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../shared/info-modal/info-modal.component';
import { ActivatedRoute } from '@angular/router';
import { MarketDataService } from '../shared/services/market-data/market-data.service';

@Component({
  selector: 'app-funding-rate',
  templateUrl: './funding-rate.component.html',
  styleUrls: ['./funding-rate.component.css'],
})
export class FundingRateComponent implements OnDestroy {
  currentMetric = this.metricService.getCurrentMetric();
  subscription: Subscription = new Subscription();
  groupedTableData: { label: string; tableData: TableDataRow[] }[] = [];

  constructor(
    private frMarketDataService: FrMarketDataService,
    private metricService: MetricService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private marketDataService: MarketDataService
  ) {
    this.route.queryParams.subscribe((params) => {
      const metric = params['metric'] || 'openInterest';
      this.metricService.changeMetricByPropertyName(metric);
    });
    // Combine metric changes + data loading into one stream
    this.subscription.add(
      this.metricService.currentMetric$.subscribe((metric) => {
        this.currentMetric = metric;
        this.loadDataAndUpdateTable();
      })
    );

    // Initial load
    this.loadDataAndUpdateTable();
  }

  private loadDataAndUpdateTable() {
    this.frMarketDataService.getGroupedFundingRateData().subscribe((groups) => {
      this.groupedTableData = groups.map((group) => ({
        label: group.label,
        tableData: this.frMarketDataService.buildTableRows(
          group.data,
          this.currentMetric.propertyName
        ),
      }));
    });
  }

  openInfoModal() {
    this.dialog.open(InfoModalComponent, {
      data: this.currentMetric,
      width: '70vw',
      height: 'auto',
      panelClass: 'full-screen-dialog',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
