import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinMetricsComponent } from './coin-metrics.component';

export const routes: Routes = [{ path: '', component: CoinMetricsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinMetricsRoutingModule {}
