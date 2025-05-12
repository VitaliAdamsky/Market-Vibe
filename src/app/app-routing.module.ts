import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/guards/auth.guard';
import { LOGIN } from 'src/consts/url-consts';
const routes: Routes = [
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
