import { Component, Input } from '@angular/core';
import { TableMetricItem } from '../models/table-metrics';

@Component({
  selector: 'app-little-cell-tooltip',
  templateUrl: './little-cell-tooltip.component.html',
  styleUrls: ['./little-cell-tooltip.component.css'],
})
export class LittleCellTooltipComponent {
  @Input() data!: TableMetricItem;
}
