import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketActivityComponent } from './market-activity.component';

export const routes: Routes = [
  { path: '', component: MarketActivityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketActivityRoutingModule {}
