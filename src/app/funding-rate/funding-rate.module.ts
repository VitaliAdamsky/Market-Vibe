import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FundingRateComponent } from './funding-rate.component';
import { FundingRateRoutingModule } from './funding-rate-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [FundingRateComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    FundingRateRoutingModule,
    //COMPONENTS
  ],
  exports: [FundingRateComponent],
})
export class FundingRateModule {}
