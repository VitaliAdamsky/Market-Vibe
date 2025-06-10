import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinCompareComponent } from './coin-compare.component';

export const routes: Routes = [{ path: '', component: CoinCompareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinCompareRoutingModule {}
