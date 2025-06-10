import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ColorsComponent } from './colors.component';
import { ColorsRoutingModule } from './colors-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ColorsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ColorsRoutingModule,
    //COMPONENTS
  ],
  exports: [ColorsComponent],
})
export class ColorsModule {}
