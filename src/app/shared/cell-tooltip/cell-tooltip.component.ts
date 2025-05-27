// cell-tooltip.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FundingRateItem } from '../models/fr';
import { OpenInterestItem } from '../models/oi';
import { TableMetricItem } from '../models/table-metrics';
import { CoinLinksService } from '../services/coin-links.service';

@Component({
  selector: 'app-cell-tooltip',
  templateUrl: './cell-tooltip.component.html',
})
export class CellTooltipComponent {
  @Input() data!: TableMetricItem;
  @Output() close = new EventEmitter<void>(); // <-- emit close request

  constructor(public coinLinksService: CoinLinksService) {}
  closeTooltip() {
    this.close.emit();
  }

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }
}
