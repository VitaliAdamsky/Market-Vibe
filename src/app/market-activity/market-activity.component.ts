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
  pagedData: MarketActivityStats[] = [];

  timeframe: TF = TF.h4;
  title = 'Market Activity';
  subtitle = `Timeframe ${this.timeframe}`;

  // Pagination
  pageSize = 300;
  page = 0;
  totalPages = 0;

  // Sorting
  sortColumn: keyof MarketActivityStats | '' = '';
  sortAsc = true;
  tableReady = false;

  constructor(private marketActivityService: MarketActivityService) {}

  async ngOnInit() {
    this.tableData = await this.marketActivityService.getCombinedSymbolStats(
      this.timeframe
    );
    this.updatePagination();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      setTimeout(() => {
        this.tableReady = true;
      }); //this.isLoaded = true;
    }, 0);
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.tableData.length / this.pageSize);
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.tableData.slice(start, end);

    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollTop = 0;
    }
  }

  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.updatePagination();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.updatePagination();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  sortData(column: keyof MarketActivityStats) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }

    this.tableData.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortAsc ? valA - valB : valB - valA;
      }
      return this.sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    this.updatePagination();
  }

  stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}
