import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-menu',
  templateUrl: './admin-panel-menu.component.html',
  styleUrls: ['./admin-panel-menu.component.css'],
})
export class AdminPanelMenuComponent {
  constructor(private router: Router) {}

  onGoToAlertsBatch() {
    this.router.navigate([]);
  }

  onGoToExchanges() {
    this.router.navigate([]);
  }

  onGoToDConfig() {
    this.router.navigate([]);
  }
}
