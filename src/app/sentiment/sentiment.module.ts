import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SentimentComponent } from './sentiment.component';

import { SentimentHeatmapComponent } from './sentiment-heatmap/sentiment-heatmap.component';
import { SentimentRoutingModule } from './sentiment-routing.module';
import { SentimentTabComponent } from './sentiment-tab/sentiment-tab.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    SentimentComponent,
    SentimentTabComponent,
    SentimentHeatmapComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatTabsModule,
    SentimentRoutingModule,
    MatIconModule,
    InfiniteScrollModule,
  ],
  exports: [SentimentComponent],
})
export class SentimentModule {}
