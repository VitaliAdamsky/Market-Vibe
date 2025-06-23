import { Metric } from '../models/metric';

export const metricPairs: Metric[][] = [
  [
    {
      title: 'Close Price',
      metric: 'closePrice',
      intervals: ['1h', '4h', '12h', 'D'],
    },
    {
      title: 'Close Price Change',
      metric: 'closePriceChange',
      intervals: ['1h', '4h', '12h', 'D'],
    },
  ],
  [
    {
      title: 'Open Interest',
      metric: 'openInterest',
      intervals: ['1h', '4h', '12h', 'D'],
    },
    {
      title: 'Open Interest Change',
      metric: 'openInterestChange',
      intervals: ['1h', '4h', '12h', 'D'],
    },
  ],
  [
    {
      title: 'Buyer Ratio',
      metric: 'buyerRatio',
      intervals: ['1h', '4h', '12h', 'D'],
    },
    {
      title: 'Buyer Ratio Change',
      metric: 'buyerRatioChange',
      intervals: ['1h', '4h', '12h', 'D'],
    },
  ],
  [
    {
      title: 'Volume',
      metric: 'quoteVolume',
      intervals: ['1h', '4h', '12h', 'D'],
    },
    {
      title: 'Volume Change',
      metric: 'quoteVolumeChange',
      intervals: ['1h', '4h', '12h', 'D'],
    },
  ],
  [
    {
      title: 'Volume Delta',
      metric: 'volumeDelta',
      intervals: ['1h', '4h', '12h', 'D'],
    },
    {
      title: 'Volume Delta Change',
      metric: 'volumeDeltaChange',
      intervals: ['1h', '4h', '12h', 'D'],
    },
  ],
  [
    {
      title: 'Funding Rate',
      metric: 'fundingRate',
      intervals: ['Funding Rate', 'Funding Rate Change'],
      isFundingRate: true,
    },
  ],
];
