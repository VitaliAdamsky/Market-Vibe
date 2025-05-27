import { Metric } from 'src/app/shared/models/metric';
import { TF } from 'src/app/shared/models/timeframes';

export const metrics: Metric[] = [
  // FUNDING
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

  // OPEN INTEREST
  ...(['h1', 'h4', 'h12', 'D'] as const).flatMap((tf) => [
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'openInterest' as const,
      dataUrl: 'assets/html/oi.html',
      timeframe: TF[tf],
    },
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'openInterestChange' as const,
      dataUrl: 'assets/html/oi-change.html',
      timeframe: TF[tf],
    },
  ]),

  // CLOSE PRICE
  ...(['h1', 'h4', 'h12', 'D'] as const).flatMap((tf) => [
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'closePrice' as const,
      dataUrl: 'assets/html/close-price.html',
      timeframe: TF[tf],
    },
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'closePriceChange' as const,
      dataUrl: 'assets/html/close-price-change.html',
      timeframe: TF[tf],
    },
  ]),

  // QUOTE VOLUME
  ...(['h1', 'h4', 'h12', 'D'] as const).flatMap((tf) => [
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'quoteVolume' as const,
      dataUrl: 'assets/html/quote-volume.html',
      timeframe: TF[tf],
    },
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'quoteVolumeChange' as const,
      dataUrl: 'assets/html/quote-volume-change.html',
      timeframe: TF[tf],
    },
  ]),

  // BUYER RATIO
  ...(['h1', 'h4', 'h12', 'D'] as const).flatMap((tf) => [
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'buyerRatio' as const,
      dataUrl: 'assets/html/buyer-ratio.html',
      timeframe: TF[tf],
    },
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'buyerRatioChange' as const,
      dataUrl: 'assets/html/buyer-ratio-change.html',
      timeframe: TF[tf],
    },
  ]),

  // VOLUME DELTA
  ...(['h1', 'h4', 'h12', 'D'] as const).flatMap((tf) => [
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'volumeDelta' as const,
      dataUrl: 'assets/html/kline.html',
      timeframe: TF[tf],
    },
    {
      title: `Timeframe ${TF[tf]}`,
      propertyName: 'volumeDeltaChange' as const,
      dataUrl: 'assets/html/kline-change.html',
      timeframe: TF[tf],
    },
  ]),

  // PERP SPOT DIFF
  ...(['h1', 'h4', 'h12', 'D'] as const).map((tf) => ({
    title: `Timeframe ${TF[tf]}`,
    propertyName: 'perpSpotDiff' as const,
    dataUrl: 'assets/html/perp-spot-diff.html',
    timeframe: TF[tf],
  })),
];
