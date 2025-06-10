import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MatIconModule } from '@angular/material/icon';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsComponent } from './coins.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CoinsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    CoinsRoutingModule,
    MatButtonModule,
    MatTooltipModule,

    //COMPONENTS
  ],
  exports: [CoinsComponent],
})
export class CoinsModule {}
