import { AppMaterialModule } from './material.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';

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

import { SharedModule } from './shared/shared.module';
import { FundingRateModule } from './funding-rate/funding-rate.module';
import { OpenInterestModule } from './open-interest/open-interest.module';
import { DataChartsModule } from './data-charts/data-charts.module';
import { PanelModule } from './panel/panel.module';
import { CoinMetricsModule } from './coin-metrics/coin-metrics.module';
import { CoinsModule } from './coins/coins.module';
import { CoinCompareModule } from './coin-compare/coin-compare.module';

import { SentimentModule } from './sentiment/sentiment.module';
import { MarketActivityModule } from './market-activity/market-activity.module';
import { MiniSentimentModule } from './mini-sentiment/mini-sentiment.module';
import { AggregatorModule } from './aggregator/aggregator.module';
import { MarketAnalyzerModule } from './market-analyzer/market-analyzer.module';
import { AdminModule } from './admin/admin.module';

registerLocaleData(localeRu);
@NgModule({
  declarations: [AppComponent, NavBarComponent],
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
    FundingRateModule,
    OpenInterestModule,
    SharedModule,
    DataChartsModule,
    PanelModule,
    CoinMetricsModule,
    CoinsModule,
    CoinCompareModule,
    SentimentModule,
    MarketActivityModule,
    MiniSentimentModule,
    AggregatorModule,
    MarketAnalyzerModule,
    AdminModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
