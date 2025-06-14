import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiniSentimentComponent } from './mini-sentiment.component';
export const routes: Routes = [{ path: '', component: MiniSentimentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniSentimentRoutingModule {}
