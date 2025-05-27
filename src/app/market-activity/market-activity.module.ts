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

@NgModule({
  declarations: [MarketActivityComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MarketActivityRoutingModule,
    MatIconModule,
  ],
  exports: [MarketActivityComponent],
})
export class MarketActivityModule {}
