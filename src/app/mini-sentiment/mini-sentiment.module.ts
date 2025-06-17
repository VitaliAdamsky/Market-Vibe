import { CanvasRenderer } from 'echarts/renderers';

import * as echarts from 'echarts/core';
import Marcaron from './marcaron';
import {
  BarChart,
  CandlestickChart,
  LineChart,
  PieChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  LegendComponent,
  ToolboxComponent,
  BarChart,
  CandlestickChart,
  LineChart,
  PieChart,
  CanvasRenderer,
]);
echarts.registerTheme('macarons', Marcaron);
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MiniSentimentRoutingModule } from './mini-sentiment-routing.module';
import { MiniSentimentComponent } from './mini-sentiment.component';
import { MiniSentimentTabComponent } from './mini-sentiment-tab/mini-sentiment-tab.component';
import { MiniSentimentChartComponent } from './mini-sentiment-chart/mini-sentiment-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    MiniSentimentComponent,
    MiniSentimentTabComponent,
    MiniSentimentChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MiniSentimentRoutingModule,
    MatIconModule,
    NgxEchartsModule.forRoot({ echarts }),
    MatTabsModule,
  ],
  exports: [MiniSentimentComponent],
})
export class MiniSentimentModule {}
