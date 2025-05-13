import { MatMenuModule } from '@angular/material/menu'; // For mat-menu/matMenuTriggerFor
import { MatToolbarModule } from '@angular/material/toolbar'; // For mat-toolbar
import { MatButtonModule } from '@angular/material/button'; // For mat-button/mat-icon-button
import { MatIconModule } from '@angular/material/icon'; // For mat-icon
import { MatTooltipModule } from '@angular/material/tooltip'; // For matTooltip
import { Subscription, take } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../login/service/auth.service';
import { COLORS } from 'src/consts/url-consts';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onGetToColors() {
    this.router.navigate([COLORS]);
  }

  goToAlertsAtWork() {
    this.router.navigate([]);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
