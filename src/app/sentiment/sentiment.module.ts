import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SentimentComponent } from './sentiment.component';

import { SentimentHeatmapComponent } from './sentiment-heatmap/sentiment-heatmap.component';
import { SentimentRoutingModule } from './sentiment-routing.module';

@NgModule({
  declarations: [SentimentComponent, SentimentHeatmapComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    SentimentRoutingModule,
    MatIconModule,
    InfiniteScrollModule,
  ],
  exports: [SentimentComponent],
})
export class SentimentModule {}
