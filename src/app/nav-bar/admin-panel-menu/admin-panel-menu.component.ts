import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TF } from 'src/app/shared/models/timeframes';
import { MetricService } from 'src/app/shared/services/metric.service';
import { OPEN_INTEREST } from 'src/consts/url-consts';

@Component({
  selector: 'app-admin-panel-menu',
  templateUrl: './admin-panel-menu.component.html',
  styleUrls: ['./admin-panel-menu.component.css'],
})
export class AdminPanelMenuComponent {
  constructor(private router: Router, private metricService: MetricService) {}

  onGoToOpenInterest() {
    this.router.navigate([OPEN_INTEREST], {
      queryParams: { metric: 'openInterest', timeframe: TF.h12 },
    });
  }

  onGoToOpenInterestChange() {
    this.router.navigate([OPEN_INTEREST], {
      queryParams: { metric: 'openInterestChange', timeframe: TF.h12 },
    });
  }
}
