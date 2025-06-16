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

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxEchartsModule } from 'ngx-echarts';
import { CoinCompareComponent } from './coin-compare.component';
import { CoinCompareRoutingModule } from './coin-compare-routing.module';
import { CoinCompareTabComponent } from './coin-compare-tab/coin-compare-tab.component';

@NgModule({
  declarations: [CoinCompareComponent, CoinCompareTabComponent],
  imports: [
    NgxEchartsModule.forRoot({ echarts }),
    CommonModule,
    SharedModule,
    MatIconModule,
    MatTabsModule,
    CoinCompareRoutingModule,
  ],
  exports: [CoinCompareComponent],
})
export class CoinCompareModule {}
