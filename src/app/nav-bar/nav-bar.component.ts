import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AGGREGATOR,
  COIN_COMPARE,
  COINS,
  COLORS,
  DATA_CHARTS,
  FUNDING_RATE,
  MARKET_ACTIVITY,
  MINI_SENTIMENT,
  PANEL,
  SENTIMENT,
} from 'src/consts/url-consts';
import { IndexedDbService } from '../shared/services/market-data/idexdb.service';
import { TF } from '../shared/models/timeframes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private indexedDbService: IndexedDbService
  ) {}

  ngOnInit(): void {}

  onGetToColors() {
    this.router.navigate([COLORS]);
  }

  goToAlertsAtWork() {
    this.router.navigate([]);
  }
  onGoToFundingRate() {
    this.router.navigate([FUNDING_RATE]);
  }

  goToTriggeredAlerts() {
    this.router.navigate([]);
  }

  goToArchivedAlerts() {
    this.router.navigate([]);
  }

  goToCoins() {
    this.router.navigate([COINS]);
  }

  goToCoinCompare() {
    this.router.navigate([COIN_COMPARE]);
  }

  goToVwapArchivedAlerts() {
    this.router.navigate([]);
  }

  goToSentiment() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([SENTIMENT], {
        queryParams: { timeframe: TF.h4 },
      })
    );
    window.open(url, '_blank');
  }

  clearIndexDbCache() {
    this.indexedDbService.clearAll();
  }

  goToMarketActivity() {
    this.router.navigate([MARKET_ACTIVITY]);
  }

  goToPanel() {
    this.router.navigate([PANEL]);
  }

  goToMiniSentiment() {
    this.router.navigate([MINI_SENTIMENT]);
  }
  goToAggregator() {
    this.router.navigate([AGGREGATOR]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
