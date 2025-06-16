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

import { SharedModule } from '../shared/shared.module';
import { CoinMetricsRoutingModule } from './coin-metrics-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CoinMetricsComponent } from './coin-metrics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CoinMetricsTabComponent } from './coin-metrics-tab/coin-metrics-tab.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [CoinMetricsComponent, CoinMetricsTabComponent],
  imports: [
    NgxEchartsModule.forRoot({ echarts }),
    CommonModule,
    SharedModule,
    MatIconModule,
    MatTabsModule,
    CoinMetricsRoutingModule,
    //COMPONENTS
  ],
  exports: [CoinMetricsComponent],
})
export class CoinMetricsModule {}
