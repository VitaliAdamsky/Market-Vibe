import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { COLORS, FUNDING_RATE, MARKET_ACTIVITY } from 'src/consts/url-consts';
import { IndexedDbService } from '../shared/services/market-data/idexdb.service';

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
    this.router.navigate([]);
  }

  goToVwapArchivedAlerts() {
    this.router.navigate([]);
  }

  clearIndexDbCache() {
    this.indexedDbService.clearAll();
  }

  goToMarketActivity() {
    this.router.navigate([MARKET_ACTIVITY]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
