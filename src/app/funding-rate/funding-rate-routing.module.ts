import { FundingRateData } from './../shared/models/fr';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundingRateComponent } from './funding-rate.component';

export const routes: Routes = [{ path: '', component: FundingRateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundingRateRoutingModule {}
