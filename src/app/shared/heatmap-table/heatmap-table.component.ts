import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TableDataRow } from '../models/table-metrics';
import { TooltipSyncService } from '../services/tooltip-sync.service';

@Component({
  selector: 'app-heatmap-table',
  templateUrl: './heatmap-table.component.html',
  styleUrls: ['./heatmap-table.component.css'],
})
export class HeatmapTableComponent {
  @Input() data: { label: string; tableData: TableDataRow[] } = {
    label: '',
    tableData: [],
  };
  constructor(private tooltipSyncService: TooltipSyncService) {}
  removedFromBeginningColumns = 0;

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  dropRow(event: CdkDragDrop<any[]>) {
    const draggedRow = this.data.tableData[event.previousIndex];
    const key = draggedRow?.symbol;

    if (
      this.tooltipSyncService.isClickTooltipOpen &&
      this.tooltipSyncService.clickTooltipKey === key
    ) {
      // Prevent drag if the row has a tooltip open
      return;
    }

    moveItemInArray(
      this.data.tableData,
      event.previousIndex,
      event.currentIndex
    );
  }
}
