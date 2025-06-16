import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketAnalyzerComponent } from './market-analyzer.component';

export const routes: Routes = [
  { path: '', component: MarketAnalyzerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketAnalyzerRoutingModule {}
