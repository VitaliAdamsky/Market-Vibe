import { Component } from '@angular/core';

interface Metric {
  title: string;
  key: string;
  intervals: string[];
  isFundingRate?: boolean;
}

@Component({
  selector: 'app-heatmaps-panel',
  templateUrl: './heatmaps-panel.component.html',
  styleUrls: ['./heatmaps-panel.component.css'],
})
export class HeatmapsPanelComponent {
  metricPairs: Metric[][] = [
    [
      {
        title: 'Close Price',
        key: 'closePrice',
        intervals: ['1h', '4h', '12h', 'D'],
      },
      {
        title: 'Close Price Change',
        key: 'closePriceChange',
        intervals: ['1h', '4h', '12h', 'D'],
      },
    ],
    [
      {
        title: 'Open Interest',
        key: 'openInterest',
        intervals: ['1h', '4h', '12h', 'D'],
      },
      {
        title: 'Open Interest Change',
        key: 'openInterestChange',
        intervals: ['1h', '4h', '12h', 'D'],
      },
    ],
    [
      {
        title: 'Buyer Ratio',
        key: 'buyerRatio',
        intervals: ['1h', '4h', '12h', 'D'],
      },
      {
        title: 'Buyer Ratio Change',
        key: 'buyerRatioChange',
        intervals: ['1h', '4h', '12h', 'D'],
      },
    ],
    [
      { title: 'Volume', key: 'volume', intervals: ['1h', '4h', '12h', 'D'] },
      {
        title: 'Volume Change',
        key: 'volumeChange',
        intervals: ['1h', '4h', '12h', 'D'],
      },
    ],
    [
      {
        title: 'Volume Delta',
        key: 'volumeDelta',
        intervals: ['1h', '4h', '12h', 'D'],
      },
      {
        title: 'Volume Delta Change',
        key: 'volumeDeltaChange',
        intervals: ['1h', '4h', '12h', 'D'],
      },
    ],
    [
      {
        title: 'Funding Rate',
        key: 'fundingRate',
        intervals: ['Funding Rate', 'Funding Rate Change'],
        isFundingRate: true,
      },
    ],
  ];

  activeSelections: { [key: string]: string } = {};

  setActive(metricKey: string, interval: string) {
    this.activeSelections[metricKey] = interval;
  }

  get currentDate(): Date {
    return new Date();
  }
}
