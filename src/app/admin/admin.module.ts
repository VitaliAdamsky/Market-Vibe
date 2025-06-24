import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NgxEchartsModule } from 'ngx-echarts';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelOneComponent } from './admin-panel-one/admin-panel-one.component';

@NgModule({
  declarations: [AdminComponent, AdminPanelOneComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    AdminRoutingModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
