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
} from 'src/consts/url-consts';

const routes: Routes = [
  {
    path: COLORS,
    loadChildren: () =>
      import('./colors/colors.module').then((m) => m.ColorsModule),
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
