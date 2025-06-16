import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  COLORS,
  FUNDING_RATE,
  KLINE,
  LOGIN,
  OPEN_INTEREST,
  MARKET_ACTIVITY,
  DATA_CHARTS,
  PANEL,
  COIN_METRICS,
  COIN_COMPARE,
  COINS,
  SENTIMENT,
  MINI_SENTIMENT,
  AGGREGATOR,
  MARKET_ANALYZER,
} from 'src/consts/url-consts';

const routes: Routes = [
  {
    path: COLORS,
    loadChildren: () =>
      import('./colors/colors.module').then((m) => m.ColorsModule),
  },
  {
    path: MARKET_ANALYZER,
    loadChildren: () =>
      import('./market-analyzer/market-analyzer.module').then(
        (m) => m.MarketAnalyzerModule
      ),
  },
  {
    path: AGGREGATOR,
    loadChildren: () =>
      import('./aggregator/aggregator.module').then((m) => m.AggregatorModule),
  },
  {
    path: DATA_CHARTS,
    loadChildren: () =>
      import('./data-charts/data-charts.module').then(
        (m) => m.DataChartsModule
      ),
  },
  {
    path: OPEN_INTEREST,
    loadChildren: () =>
      import('./open-interest/open-interest.module').then(
        (m) => m.OpenInterestModule
      ),
  },
  {
    path: FUNDING_RATE,
    loadChildren: () =>
      import('./funding-rate/funding-rate.module').then(
        (m) => m.FundingRateModule
      ),
  },
  {
    path: KLINE,
    loadChildren: () =>
      import('./kline/kline.module').then((m) => m.KlineModule),
  },
  {
    path: MARKET_ACTIVITY,
    loadChildren: () =>
      import('./market-activity/market-activity.module').then(
        (m) => m.MarketActivityModule
      ),
  },
  {
    path: PANEL,
    loadChildren: () =>
      import('./panel/panel.module').then((m) => m.PanelModule),
  },
  {
    path: MINI_SENTIMENT,
    loadChildren: () =>
      import('./mini-sentiment/mini-sentiment.module').then(
        (m) => m.MiniSentimentModule
      ),
  },
  {
    path: COIN_COMPARE,
    loadChildren: () =>
      import('./coin-compare/coin-compare.module').then(
        (m) => m.CoinCompareModule
      ),
  },
  {
    path: SENTIMENT,
    loadChildren: () =>
      import('./sentiment/sentiment.module').then((m) => m.SentimentModule),
  },
  {
    path: COIN_METRICS,
    loadChildren: () =>
      import('./coin-metrics/coin-metrics.module').then(
        (m) => m.CoinMetricsModule
      ),
  },
  {
    path: COINS,
    loadChildren: () =>
      import('./coins/coins.module').then((m) => m.CoinsModule),
  },
  {
    path: LOGIN,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
