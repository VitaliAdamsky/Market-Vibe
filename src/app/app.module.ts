import { AppMaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AlertMenuComponent } from './nav-bar/alert-menu/alert-menu.component';
import { VwapAlertMenuComponent } from './nav-bar/vwap-alert-menu/vwap-alert-menu.component';
import { AdminPanelMenuComponent } from './nav-bar/admin-panel-menu/admin-panel-menu.component';

import { LoginModule } from './login/login.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { env } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorsModule } from './colors/colors.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AlertMenuComponent,
    VwapAlertMenuComponent,
    AdminPanelMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(env.firebaseConfig),
    AngularFireAuthModule,
    //--- MY MODULES ---
    LoginModule,
    ColorsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
