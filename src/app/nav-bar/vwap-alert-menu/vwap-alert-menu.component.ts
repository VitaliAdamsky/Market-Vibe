import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vwap-alert-menu',
  templateUrl: './vwap-alert-menu.component.html',
  styleUrls: ['./vwap-alert-menu.component.css'],
})
export class VwapAlertMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToAlertsAtWork() {
    this.router.navigate([]);
  }

  goToArchivedAlerts() {
    this.router.navigate([]);
  }
  goToTriggeredAlerts() {
    this.router.navigate([]);
  }
}
