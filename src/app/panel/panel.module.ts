import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PanelComponent } from './panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    PanelRoutingModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [PanelComponent],
})
export class PanelModule {}
