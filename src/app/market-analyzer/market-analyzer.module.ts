import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarketAnalyzerComponent } from './market-analyzer.component';
import { MarketAnalyzerRoutingModule } from './market-analyzer-routing.module';

@NgModule({
  declarations: [MarketAnalyzerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MarketAnalyzerRoutingModule,
    MatIconModule,
  ],
  exports: [MarketAnalyzerComponent],
})
export class MarketAnalyzerModule {}
