import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { COLORS, LOGIN } from 'src/consts/url-consts';
import { ColorsComponent } from './colors/colors.component';
const routes: Routes = [
  {
    path: COLORS,
    loadChildren: () =>
      import('./colors/colors.module').then((m) => m.ColorsModule),
  },
  {
    path: LOGIN,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
