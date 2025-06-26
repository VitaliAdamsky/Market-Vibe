// cell-tooltip.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FundingRateItem } from '../models/fr';
import { OpenInterestItem } from '../models/oi';
import { TableMetricItem } from '../models/table-metrics';
import { CoinLinksService } from '../services/coin-links.service';
import { COIN_METRICS } from 'src/consts/url-consts';
import { SnackbarType } from '../models/snackbar-type';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/services/snackbar.service';
import { Coin } from '../models/coin';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-cell-tooltip',
  templateUrl: './cell-tooltip.component.html',
})
export class CellTooltipComponent {
  @Input() data!: TableMetricItem;
  @Output() close = new EventEmitter<void>(); // <-- emit close request

  constructor(
    public coinLinksService: CoinLinksService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
  closeTooltip() {
    this.close.emit();
  }

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  onGoToCoinMetrics() {
    const coin: Coin = {
      symbol: this.data.symbol,
      category: this.data.category,
      imageUrl: this.data.imageUrl ?? '',
      exchanges: this.data.exchanges,
    };

    const uuid = crypto.randomUUID(); // Генерируем уникальный ID

    // Сохраняем данные по уникальному ключу
    localStorage.setItem(`${COIN_METRICS}_${uuid}`, JSON.stringify([coin]));

    // Формируем URL с uuid в query параметре
    const url = this.router
      .createUrlTree([COIN_METRICS], {
        queryParams: { uuid },
      })
      .toString();

    window.open(url, '_blank');
  }
}
