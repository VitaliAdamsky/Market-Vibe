import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetricService } from 'src/app/shared/services/metric.service';
import { FUNDING_RATE } from 'src/consts/url-consts';

@Component({
  selector: 'app-alert-menu',
  templateUrl: './alert-menu.component.html',
  styleUrls: ['./alert-menu.component.css'],
})
export class AlertMenuComponent implements OnInit {
  constructor(private router: Router, private metricService: MetricService) {}

  ngOnInit(): void {}

  goToFundingRate() {
    this.router.navigate([FUNDING_RATE], {
      queryParams: { metric: 'fundingRate' },
    });
  }

  goToFundingRateChange() {
    this.router.navigate([FUNDING_RATE], {
      queryParams: { metric: 'fundingRateChange' },
    });
  }

  goToArchivedAlerts() {
    this.router.navigate([]);
  }
}
