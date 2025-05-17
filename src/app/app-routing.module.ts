import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  COLORS,
  FUNDING_RATE,
  LOGIN,
  OPEN_INTEREST,
} from 'src/consts/url-consts';

const routes: Routes = [
  {
    path: COLORS,
    loadChildren: () =>
      import('./colors/colors.module').then((m) => m.ColorsModule),
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
