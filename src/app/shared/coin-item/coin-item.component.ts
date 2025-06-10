import { Component, Input } from '@angular/core';
import { SelectionService } from 'src/app/shared/services/selection.service';
import { Coin } from 'src/app/shared/models/coin';
import { SnackbarService } from 'src/services/snackbar.service';
import { SnackbarType } from '../models/snackbar-type';

@Component({
  selector: 'app-coin-item',
  templateUrl: './coin-item.component.html',
  styleUrls: ['./coin-item.component.css'],
})
export class CoinItemComponent {
  @Input() coin!: Coin;
  @Input() isSelected = false;
  maxSelections = 7;
  constructor(
    public selectionService: SelectionService<Coin>,
    private snackbarService: SnackbarService
  ) {}

  onCoinItemClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Проверяем, что клик был НЕ по изображению
    if (!target.closest('img')) {
      this.toggleSelection();
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

  // isSelected(): boolean {
  //   return this.selectionService.isSelected(this.coin);
  // }

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }
}
