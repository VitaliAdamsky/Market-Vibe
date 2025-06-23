import { TF } from 'src/app/shared/models/timeframes';
import { Metric } from '../models/metric';
import { metricPairs } from './../data/heatmap-metrics';
import { Component } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { FUNDING_RATE, KLINE, OPEN_INTEREST } from 'src/consts/url-consts';
import { getRouterLink } from '../functions/get-router-link';

@Component({
  selector: 'app-heatmaps-panel',
  templateUrl: './heatmaps-panel.component.html',
  styleUrls: ['./heatmaps-panel.component.css'],
})
export class HeatmapsPanelComponent {
  metricPairs: Metric[][] = metricPairs;
  activeSelections: Record<string, string> = {};

  constructor(private router: Router) {}

  setActive(metric: string, interval: string) {
    this.activeSelections[metric] = interval;
    if (metric === 'fundingRate' && interval === 'Funding Rate Change') {
      const tree: UrlTree = this.router.createUrlTree([FUNDING_RATE], {
        queryParams: { metric: 'fundingRateChange' },
      });
      const url = this.router.serializeUrl(tree);
      window.open(url, '_blank');
    } else if (metric === 'fundingRate' && interval === 'Funding Rate') {
      const tree: UrlTree = this.router.createUrlTree([FUNDING_RATE], {
        queryParams: { metric: 'fundingRate' },
      });
      const url = this.router.serializeUrl(tree);
      window.open(url, '_blank');
    } else {
      const link = getRouterLink(metric);
      const tree: UrlTree = this.router.createUrlTree([link], {
        queryParams: { metric, timeframe: interval },
      });
      const url = this.router.serializeUrl(tree);
      window.open(url, '_blank');
    }
  }
}
