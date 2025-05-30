import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  DATA_CHARTS,
  MARKET_ACTIVITY,
  OPEN_INTEREST,
} from 'src/consts/url-consts';
import { DataType } from '../shared/models/data-type';
import { TF } from '../shared/models/timeframes';
import { KlineDataItem } from '../shared/models/kline';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  TF = TF;
  constructor(private router: Router) {}

  goToCharts(
    dataType: DataType,
    timeframe: TF,
    propertyKey?: keyof KlineDataItem
  ) {
    const tree = this.router.createUrlTree([DATA_CHARTS], {
      queryParams: { dataType, timeframe, propertyKey },
    });
    const url = this.router.serializeUrl(tree);
    window.open(window.location.origin + url, '_blank');
  }
}
