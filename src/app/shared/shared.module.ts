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

import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoinItemComponent } from './coin-item/coin-item.component';
import { LoadingComponent } from './loading/loading.component';

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
    ScrollToTopComponent,
    SearchBoxComponent,
    CoinItemComponent,
    LoadingComponent,
  ],
  imports: [
    //MODULES
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    DragDropModule,
    InfiniteScrollModule,

    //COMPONENTS
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
    ScrollToTopComponent,
    SearchBoxComponent,
    CoinItemComponent,
    LoadingComponent,
  ],
})
export class SharedModule {}
