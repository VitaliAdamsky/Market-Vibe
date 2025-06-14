import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MiniSentimentHeatmapComponent } from './mini-sentiment-heatmap/mini-sentiment-heatmap.component';
import { MiniSentimentRoutingModule } from './mini-sentiment-routing.module';
import { MiniSentimentComponent } from './mini-sentiment.component';

@NgModule({
  declarations: [MiniSentimentComponent, MiniSentimentHeatmapComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MiniSentimentRoutingModule,
    MatIconModule,
    InfiniteScrollModule,
  ],
  exports: [MiniSentimentComponent],
})
export class MiniSentimentModule {}
