import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlineRoutingModule } from './kline-routing.module';
import { SharedModule } from '../shared/shared.module';
import { KlineComponent } from './kline.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [KlineComponent],
  imports: [CommonModule, SharedModule, KlineRoutingModule, MatIconModule],
  exports: [KlineComponent],
})
export class KlineModule {}
