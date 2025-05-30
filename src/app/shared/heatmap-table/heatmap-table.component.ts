import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
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

  visibleRows: TableDataRow[] = [];
  chunkSize = 50;

  constructor(private tooltipSyncService: TooltipSyncService) {}

  ngOnChanges() {
    this.visibleRows = this.data.tableData.slice(0, this.chunkSize);
  }

  onScrollDown() {
    const nextChunk = this.data.tableData.slice(
      this.visibleRows.length,
      this.visibleRows.length + this.chunkSize
    );
    this.visibleRows = [...this.visibleRows, ...nextChunk];
  }

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  dropRow(event: CdkDragDrop<any[]>) {
    const draggedRow = this.visibleRows[event.previousIndex];
    const key = draggedRow?.symbol;

    if (
      this.tooltipSyncService.isClickTooltipOpen &&
      this.tooltipSyncService.clickTooltipKey === key
    ) {
      return;
    }

    moveItemInArray(this.visibleRows, event.previousIndex, event.currentIndex);
  }
}
