import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { MarketActivityStats } from 'src/app/shared/models/market-activity-stats';
import { TF } from 'src/app/shared/models/timeframes';
import { MarketActivityService } from '../services/market-activity.service';

@Component({
  selector: 'app-market-activity-tab',
  templateUrl: './market-activity-tab.component.html',
  styleUrls: ['./market-activity-tab.component.css'],
})
export class MarketActivityTabComponent implements OnInit, AfterViewInit {
  @Input() timeframe!: TF;

  tableData: MarketActivityStats[] = [];
  filteredData: MarketActivityStats[] = [];
  pagedData: MarketActivityStats[] = [];

  searchQuery = '';

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
