import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  COLORS,
  FUNDING_RATE,
  LOGIN,
  OPEN_INTEREST,
} from 'src/consts/url-consts';
import { FundingRateComponent } from './funding-rate/funding-rate.component';
import { OpenInterestComponent } from './open-interest/open-interest.component';

const routes: Routes = [
  {
    path: COLORS,
    loadChildren: () =>
      import('./colors/colors.module').then((m) => m.ColorsModule),
  },
  {
    path: FUNDING_RATE,
    component: FundingRateComponent,
  },
  {
    path: OPEN_INTEREST,
    component: OpenInterestComponent,
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
