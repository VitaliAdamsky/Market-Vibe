import { CanvasRenderer } from 'echarts/renderers';

import * as echarts from 'echarts/core';
import Marcaron from './marcaron';
import { BarChart, CandlestickChart, LineChart } from 'echarts/charts';
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
  CanvasRenderer,
]);
echarts.registerTheme('macarons', Marcaron);

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChartsComponent } from './data-charts.component';
import { DataChartsRoutingModule } from './data-charts-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from './chart/chart.component';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DataChartTabComponent } from './data-chart-tab/data-chart-tab.component';

@NgModule({
  declarations: [DataChartsComponent, ChartComponent, DataChartTabComponent],
  imports: [
    DataChartsRoutingModule,
    NgxEchartsModule.forRoot({ echarts }),
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    //COMPONENTS
  ],
  exports: [DataChartsComponent],
})
export class DataChartsModule {}
