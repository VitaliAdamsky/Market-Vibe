// cell-tooltip.component.ts
import { Component, Input } from '@angular/core';
import { FundingRateItem } from '../models/fr';
import { OpentInterestItem } from '../models/oi';
import { TableMetricItem } from '../models/table-metrics';

@Component({
  selector: 'app-cell-tooltip',
  templateUrl: './cell-tooltip.component.html',
})
export class CellTooltipComponent {
  @Input() data!: TableMetricItem;
}
