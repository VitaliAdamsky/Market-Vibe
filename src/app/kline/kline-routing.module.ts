import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KlineComponent } from './kline.component';

export const routes: Routes = [{ path: '', component: KlineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KlineRoutingModule {}
