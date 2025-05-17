import { Metric } from 'src/app/shared/models/metric';
import { TF } from 'src/app/shared/models/timeframes';

export const metrics: Metric[] = [
  {
    title: 'Funding Rate',
    propertyName: 'fundingRate',
    dataUrl: 'assets/html/fr.html',
  },
  {
    title: 'Funding Rate Change',
    propertyName: 'fundingRateChange',
    dataUrl: 'assets/html/fr-change.html',
  },
  {
    title: 'Timeframe 1h',
    propertyName: 'openInterest',
    dataUrl: 'assets/html/oi.html',
    timeframe: TF.h1,
  },
  {
    title: 'Timeframe 4h',
    propertyName: 'openInterest',
    dataUrl: 'assets/html/oi.html',
    timeframe: TF.h4,
  },
  {
    title: 'Timeframe 12h',
    propertyName: 'openInterest',
    dataUrl: 'assets/html/oi.html',
    timeframe: TF.h12,
  },
  {
    title: 'Timeframe Daily',
    propertyName: 'openInterest',
    dataUrl: 'assets/html/oi.html',
    timeframe: TF.D,
  },
  {
    title: 'Timeframe 1h',
    propertyName: 'openInterestChange',
    dataUrl: 'assets/html/oi-change.html',
    timeframe: TF.h1,
  },
  {
    title: 'Timeframe 4h',
    propertyName: 'openInterestChange',
    dataUrl: 'assets/html/oi-change.html',
    timeframe: TF.h4,
  },
  {
    title: 'Timeframe 12h',
    propertyName: 'openInterestChange',
    dataUrl: 'assets/html/oi-change.html',
    timeframe: TF.h12,
  },
  {
    title: 'Timeframe Daily',
    propertyName: 'openInterestChange',
    dataUrl: 'assets/html/oi-change.html',
    timeframe: TF.D,
  },
];
