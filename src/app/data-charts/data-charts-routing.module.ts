import { FundingRateData } from '../shared/models/fr';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataChartsComponent } from './data-charts.component';

export const routes: Routes = [{ path: '', component: DataChartsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataChartsRoutingModule {}
