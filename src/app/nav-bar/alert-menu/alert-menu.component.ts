import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TF } from 'src/app/shared/models/timeframes';
import { MetricService } from 'src/app/shared/services/metric.service';
import { FUNDING_RATE, KLINE } from 'src/consts/url-consts';

@Component({
  selector: 'app-alert-menu',
  templateUrl: './alert-menu.component.html',
  styleUrls: ['./alert-menu.component.css'],
})
export class AlertMenuComponent implements OnInit {
  constructor(private router: Router) {}

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

  //  CLOSE PRICE
  goToClosePrice() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'closePrice', timeframe: TF.h4 },
    });
  }

  goToClosePriceChange() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'closePriceChange', timeframe: TF.h4 },
    });
  }

  // BUYER RATIO
  goToBuyerRatio() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'buyerRatio', timeframe: TF.h4 },
    });
  }

  goToBuyerRatioChange() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'buyerRatioChange', timeframe: TF.h4 },
    });
  }

  // QUOTE VOLUME

  goToQuoteVolume() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'quoteVolume', timeframe: TF.h4 },
    });
  }

  goToQuoteVolumeChange() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'quoteVolumeChange', timeframe: TF.h4 },
    });
  }

  // VOLUME DELTA
  goToVolumeDelta() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'volumeDelta', timeframe: TF.h4 },
    });
  }

  goToVolumeDeltaChange() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'volumeDeltaChange', timeframe: TF.h4 },
    });
  }

  // PERP SPOT DIFF
  goToPerpSpotDiff() {
    this.router.navigate([KLINE], {
      queryParams: { metric: 'perpSpotDiff', timeframe: TF.h4 },
    });
  }
}
