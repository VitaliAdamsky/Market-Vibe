import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HeatmapTableComponent } from './heatmap-table/heatmap-table.component';
import { ExchangesTooltipComponent } from './exchanges-tooltip/exchanges-tooltip.component';
import { ExchangeTooltipDirective } from './exchanges-tooltip/directives/exchange-tooltip.directive';
import { InfoModalComponent } from './info-modal/info-modal.component';

import { CellTooltipComponent } from './cell-tooltip/cell-tooltip.component';
import { CellTooltipDirective } from './cell-tooltip/directives/cell-tooltip.directive';
import { LittleCellTooltipComponent } from './little-cell-tooltip/little-cell-tooltip.component';
import { LittleCellTooltipDirective } from './little-cell-tooltip/directives/little-cell-tooltip.directive';

@NgModule({
  declarations: [
    HeatmapTableComponent,
    ExchangesTooltipComponent,
    ExchangeTooltipDirective,
    InfoModalComponent,
    CellTooltipComponent,
    CellTooltipDirective,
    LittleCellTooltipComponent,
    LittleCellTooltipDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DragDropModule,
  ],
  exports: [
    HeatmapTableComponent,
    ExchangesTooltipComponent,
    ExchangeTooltipDirective,
    InfoModalComponent,
    CellTooltipComponent,
    CellTooltipDirective,
    LittleCellTooltipComponent,
    LittleCellTooltipDirective,
  ],
})
export class SharedModule {}
