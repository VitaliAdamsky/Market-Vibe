import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenInterestRoutingModule } from './open-interest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OpenInterestComponent } from './open-interest.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OpenInterestComponent],
  imports: [
    CommonModule,
    SharedModule,
    OpenInterestRoutingModule,
    MatIconModule,
  ],
  exports: [OpenInterestComponent],
})
export class OpenInterestModule {}
