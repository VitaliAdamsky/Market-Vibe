import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregatorComponent } from './aggregator.component';

export const routes: Routes = [{ path: '', component: AggregatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggregatorRoutingModule {}
