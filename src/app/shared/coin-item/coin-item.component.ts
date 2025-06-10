import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectionService } from 'src/app/shared/services/selection.service';
import { Coin } from 'src/app/shared/models/coin';
import { SnackbarService } from 'src/services/snackbar.service';
import { SnackbarType } from '../models/snackbar-type';
import { Router } from '@angular/router';
import { COIN_METRICS } from 'src/consts/url-consts';
import { TF } from '../models/timeframes';
type ActionType = 'select' | 'compare';

@Component({
  selector: 'app-coin-item',
  templateUrl: './coin-item.component.html',
  styleUrls: ['./coin-item.component.css'],
})
export class CoinItemComponent {
  @Input() timeframe: TF = TF.h4;
  @Input() actionType: ActionType = 'select';
  @Input() isSelected = false;
  @Input() coin!: Coin;
  maxSelections = 7;
  constructor(
    public selectionService: SelectionService<Coin>,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  onCoinItemClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Проверяем, что клик был НЕ по изображению
    if (!target.closest('img') && this.actionType === 'select') {
      this.toggleSelection();
    } else if (!target.closest('img') && this.actionType === 'compare') {
      this.goToMetrics();
    }
  }

  toggleSelection(): void {
    // Этот метод можно оставить для других вызовов, но он не используется напрямую в этом компоненте
    if (
      this.selectionService.selectedValues().length < 7 ||
      this.selectionService.isSelected(this.coin)
    ) {
      this.selectionService.toggle(this.coin);
    } else {
      this.snackbarService.showSnackBar(
        'Можно выбрать максимум 7 монет.',
        '',
        3000,
        SnackbarType.Info
      );
    }
  }

  goToMetrics() {
    const url = this.router
      .createUrlTree([COIN_METRICS], {
        queryParams: {
          symbol: this.coin.symbol,
          timeframe: this.timeframe,
          imageUrl: this.coin.imageUrl,
        },
      })
      .toString();

    window.open(url, '_blank');
  }

  // isSelected(): boolean {
  //   return this.selectionService.isSelected(this.coin);
  // }

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }
}
