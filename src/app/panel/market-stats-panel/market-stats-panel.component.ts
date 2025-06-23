import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AGGREGATOR,
  MARKET_ACTIVITY,
  MARKET_ANALYZER,
  MINI_SENTIMENT,
  SENTIMENT,
} from 'src/consts/url-consts';

interface Metric {
  title: string;
  key: string;
  intervals: string[];
  isFundingRate?: boolean;
}

@Component({
  selector: 'app-market-stats-panel',
  templateUrl: './market-stats-panel.component.html',
  styleUrls: ['./market-stats-panel.component.css'],
})
export class MarketStatsPanelComponent {
  metrics = [
    { title: 'Sentiment', key: SENTIMENT },
    { title: 'Mini Sentiment', key: MINI_SENTIMENT },
    { title: 'Aggregations', key: AGGREGATOR },
    { title: 'Analytics', key: MARKET_ANALYZER },
    { title: 'Market Activity', key: MARKET_ACTIVITY },
  ];

  activeMetric: string = SENTIMENT;
  constructor(private router: Router) {}

  setActive(key: string) {
    this.activeMetric = key;
    const url = this.router.serializeUrl(this.router.createUrlTree([key]));
    window.open(url, '_blank');
  }

  get currentDate(): Date {
    return new Date();
  }
}
