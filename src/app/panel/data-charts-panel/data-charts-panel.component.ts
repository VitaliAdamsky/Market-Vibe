import { Component } from '@angular/core';

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
  metrics = [
    { title: 'Close Price', key: 'closePrice' },
    { title: 'Open Interest', key: 'openInterest' },
    { title: 'Buyer Ratio', key: 'buyerRatio' },
    { title: 'Volume', key: 'volume' },
    { title: 'Volume Delta', key: 'volumeDelta' },
    { title: 'Funding Rate', key: 'fundingRate' },
  ];

  activeMetric: string = 'closePrice';

  setActive(key: string) {
    this.activeMetric = key;
  }

  get currentDate(): Date {
    return new Date();
  }
}
