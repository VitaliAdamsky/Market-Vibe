import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-menu',
  templateUrl: './alert-menu.component.html',
  styleUrls: ['./alert-menu.component.css'],
})
export class AlertMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToAlertsAtWork() {
    this.router.navigate([]);
  }

  goToTriggeredAlerts() {
    this.router.navigate([]);
  }

  goToArchivedAlerts() {
    this.router.navigate([]);
  }
}
