import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenInterestComponent } from './open-interest.component';

export const routes: Routes = [{ path: '', component: OpenInterestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenInterestRoutingModule {}
