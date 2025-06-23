import { FUNDING_RATE, OPEN_INTEREST, KLINE } from 'src/consts/url-consts';

const metricToRouteMap: Record<string, string> = {
  oi: OPEN_INTEREST,
  fr: FUNDING_RATE,
  kline: KLINE,
};

const specialFundingRoutes: Record<string, string> = {
  'Funding Rate': 'fundingRate',
  'Funding Rate Change': 'fundingRateChange',
};

export function getRouterLink(
  metric: string,
  interval?: string
): string | string[] {
  if (metric === 'openInterest' || metric === 'openInterestChange') {
    return metricToRouteMap['oi'];
  }

  if (metric === 'fundingRate' && interval && specialFundingRoutes[interval]) {
    return [metricToRouteMap['fr'], specialFundingRoutes[interval]];
  }

  return metricToRouteMap['kline'];
}
