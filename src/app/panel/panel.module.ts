import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PanelComponent } from './panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeatmapsPanelComponent } from './heatmaps-panel/heatmaps-panel.component';
import { DataChartsPanelComponent } from './data-charts-panel/data-charts-panel.component';
import { MarketStatsPanelComponent } from './market-stats-panel/market-stats-panel.component';

@NgModule({
  declarations: [
    PanelComponent,
    HeatmapsPanelComponent,
    DataChartsPanelComponent,
    MarketStatsPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PanelRoutingModule,
    MatIconModule,
    MatButtonModule,
    //COMPONENTS
  ],
  exports: [PanelComponent],
})
export class PanelModule {}
