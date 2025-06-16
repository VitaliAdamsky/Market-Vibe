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
import { MatButtonModule } from '@angular/material/button';
import { AggregatorComponent } from './aggregator.component';
import { AggregatorRoutingModule } from './aggregator-routing.module';
import { AggregatorTabComponent } from './aggregator-tab/aggregator-tab.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [AggregatorComponent, AggregatorTabComponent],
  imports: [
    NgxEchartsModule.forRoot({ echarts }),
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    AggregatorRoutingModule,
  ],
  exports: [AggregatorComponent],
})
export class AggregatorModule {}
