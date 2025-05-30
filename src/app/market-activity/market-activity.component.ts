import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MarketActivityStats } from '../shared/models/market-activity-stats';
import { MarketActivityService } from './services/market-activity.service';
import { TF } from '../shared/models/timeframes';

@Component({
  selector: 'app-market-activity',
  templateUrl: './market-activity.component.html',
  styleUrls: ['./market-activity.component.css'],
})
export class MarketActivityComponent implements OnInit, AfterViewInit {
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  tableData: MarketActivityStats[] = [];
  filteredData: MarketActivityStats[] = [];
  pagedData: MarketActivityStats[] = [];

  searchQuery = '';
  timeframe: TF = TF.h4;
  title = 'Рыночная Активность';
  subtitle = `Timeframe ${this.timeframe}`;

  openTime = 0;
  closeTime = 0;

  // Sorting
  sortColumn: keyof MarketActivityStats | '' = '';
  sortAsc = true;
  tableReady = false;

  // Pagination for infinite scroll
  itemsToShow = 50;
  itemsIncrement = 50;

  constructor(private marketActivityService: MarketActivityService) {}

  async ngOnInit() {
    this.tableData = await this.marketActivityService.getCombinedSymbolStats(
      this.timeframe
    );
    this.filteredData = [...this.tableData];

    this.openTime = this.tableData[0]?.openTime || 0;
    this.closeTime = this.tableData[0]?.closeTime || 0;

    this.updatePagedData();

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tableReady = true;
    }, 0);
  }

  applySearch(query: string) {
    this.searchQuery = query;
    const lower = query.trim().toLowerCase();

    this.filteredData = this.tableData.filter((item) =>
      item.symbol.toLowerCase().includes(lower)
    );

    // Reset paging on new filter
    this.itemsToShow = this.itemsIncrement;
    this.updatePagedData();
  }

  sortData(column: keyof MarketActivityStats) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }

    this.filteredData.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortAsc ? valA - valB : valB - valA;
      }
      return this.sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    // Reset paging on new sort
    this.itemsToShow = this.itemsIncrement;
    this.updatePagedData();
  }

  updatePagedData() {
    this.pagedData = this.filteredData.slice(0, this.itemsToShow);
  }

  loadMoreData() {
    if (this.itemsToShow < this.filteredData.length) {
      this.itemsToShow += this.itemsIncrement;
      this.updatePagedData();
    }
  }

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  trackBySymbol(index: number, item: MarketActivityStats) {
    return item.symbol;
  }
}
