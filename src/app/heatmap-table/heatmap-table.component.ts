import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { TableDataRow } from '../shared/models/table-metrics';
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

  removedFromBeginningColumns = 0;

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  dropRow(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.data.tableData,
      event.previousIndex,
      event.currentIndex
    );
  }
}
