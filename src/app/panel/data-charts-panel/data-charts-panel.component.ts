import { Component } from '@angular/core';
import { dataChartmetrics } from '../data/data-chart-metrics';
import { Router, UrlTree } from '@angular/router';
import { interval } from 'rxjs';
import { getRouterLink } from '../functions/get-router-link';
import { DATA_CHARTS } from 'src/consts/url-consts';

interface Metric {
  title: string;
  key: string;
  intervals: string[];
  isFundingRate?: boolean;
}

@Component({
  selector: 'app-data-charts-panel',
  templateUrl: './data-charts-panel.component.html',
  styleUrls: ['./data-charts-panel.component.css'],
})
export class DataChartsPanelComponent {
  metrics = dataChartmetrics;
  activeMetric: string = 'closePrice';

  constructor(private router: Router) {}

  setActive(metric: string, dataType: string) {
    this.activeMetric = metric;
    const link = DATA_CHARTS;
    const tree: UrlTree = this.router.createUrlTree([link], {
      queryParams: { metric, dataType },
    });
    const url = this.router.serializeUrl(tree);
    window.open(url, '_blank');
  }
}
