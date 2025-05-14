import { Component } from '@angular/core';
import { CoinLinksService } from 'src/app/heatmap/services/coin-links.service';

@Component({
  selector: 'app-exchanges-tooltip',
  templateUrl: './exchanges-tooltip.component.html',
  styleUrls: ['./exchanges-tooltip.component.css'],
})
export class ExchangesTooltipComponent {
  constructor(public coinLinksService: CoinLinksService) {}
  symbol: string = '';
  exchanges: string[] = [];
}
