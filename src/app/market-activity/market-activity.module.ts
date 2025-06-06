import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketActivityRoutingModule } from './market-activity-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MarketActivityComponent } from './market-activity.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [MarketActivityComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MarketActivityRoutingModule,
    MatIconModule,
    InfiniteScrollModule,
  ],
  exports: [MarketActivityComponent],
})
export class MarketActivityModule {}
