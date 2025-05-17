import { AppMaterialModule } from './material.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AlertMenuComponent } from './nav-bar/alert-menu/alert-menu.component';
import { VwapAlertMenuComponent } from './nav-bar/vwap-alert-menu/vwap-alert-menu.component';
import { AdminPanelMenuComponent } from './nav-bar/admin-panel-menu/admin-panel-menu.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginModule } from './login/login.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { env } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorsModule } from './colors/colors.module';

import { ExchangesTooltipComponent } from './shared/exchanges-tooltip/exchanges-tooltip.component';
import { ExchangeTooltipDirective } from './shared/exchanges-tooltip/directives/exchange-tooltip.directive';
import { HeatmapTableComponent } from './heatmap-table/heatmap-table.component';
import { FundingRateComponent } from './funding-rate/funding-rate.component';
import { InfoModalComponent } from './shared/info-modal/info-modal.component';
import { OpenInterestComponent } from './open-interest/open-interest.component';
import { CellTooltipComponent } from './shared/cell-tooltip/cell-tooltip.component';
import { CellTooltipDirective } from './shared/cell-tooltip/directives/cell-tooltip.directive';
import { LittleCellTooltipComponent } from './shared/little-cell-tooltip/little-cell-tooltip.component';
import { LittleCellTooltipDirective } from './shared/little-cell-tooltip/directives/little-cell-tooltip.directive';
registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AlertMenuComponent,
    VwapAlertMenuComponent,
    AdminPanelMenuComponent,
    HeatmapTableComponent,
    ExchangesTooltipComponent,
    ExchangeTooltipDirective,
    FundingRateComponent,
    InfoModalComponent,
    OpenInterestComponent,
    CellTooltipComponent,
    CellTooltipDirective,
    LittleCellTooltipComponent,
    LittleCellTooltipDirective,
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
    DragDropModule,
    //--- MY MODULES ---
    LoginModule,
    ColorsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
