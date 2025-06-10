import { TF } from 'src/app/shared/models/timeframes';
import { time } from 'echarts';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinsService } from './services/coins.service';
import { Coin } from '../shared/models/coin';
import { Subscription } from 'rxjs';
import { SelectionService } from '../shared/services/selection.service';
import { COIN_METRICS } from 'src/consts/url-consts';

import { Router } from '@angular/router';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css'],
})
export class CoinsComponent implements OnInit, OnDestroy {
  isAlpahbetAsc = true;
  isCategoryAsc = true;
  private openedWindows: Window[] = [];
  TF = TF;
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  subscription: Subscription = new Subscription();
  selected!: number;
  searchQuery: string = '';
  private sortState: 'romanAsc' | 'romanDesc' | 'alphaAsc' | 'alphaDesc' =
    'alphaAsc';

  constructor(
    private coinsService: CoinsService,
    private selectionService: SelectionService<Coin>,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    this.subscription.add(
      this.coinsService.getCoins().subscribe((coins) => {
        this.coins = coins;
        this.applySearch(this.searchQuery); // применить поиск при загрузке
        console.log('Coins fetched', coins.length);
      })
    );

    this.subscription.add(
      this.selectionService.selectionChanges$.subscribe((selectedCoins) => {
        this.selected = selectedCoins.length;
      })
    );
  }

  applySearch(query: string): void {
    this.searchQuery = query;
    const lowerQuery = query.toLowerCase().trim();

    this.filteredCoins = this.coins.filter((coin) =>
      coin.symbol.toLowerCase().includes(lowerQuery)
    );
  }

  toggleAll() {
    const selected = this.selectionService.selectedValues();
    const anySelected = selected.some((coin) =>
      this.filteredCoins.includes(coin)
    );

    if (anySelected) {
      this.selectionService.clear();
    }
  }

  // ======= COIN SORTING ===============

  sortByCategory(): void {
    const order = this.sortState === 'romanAsc' ? 'desc' : 'asc';
    this.isCategoryAsc = !this.isCategoryAsc;
    this.sortRomanNumerals(order);
    this.sortState = order === 'asc' ? 'romanAsc' : 'romanDesc';
    this.applySearch(this.searchQuery);
    console.log(`Sorted by Category (${this.sortState})`, this.filteredCoins);
  }

  sortByAlphabet(): void {
    this.isAlpahbetAsc = !this.isAlpahbetAsc;
    const order = this.sortState === 'alphaAsc' ? 'desc' : 'asc';
    this.sortAlphabetically(order);
    this.sortState = order === 'asc' ? 'alphaAsc' : 'alphaDesc';
    this.applySearch(this.searchQuery);
    console.log(
      `Sorted Alphabetically (${this.sortState})`,
      this.filteredCoins
    );
  }
  /**
   * Sorts the coins array by Roman numeral order.
   * @param order - 'asc' for ascending, 'desc' for descending
   */
  private sortRomanNumerals(order: 'asc' | 'desc'): void {
    const romanOrder = ['I', 'II', 'III', 'IV', 'V', 'VI']; // Define the Roman numeral order
    this.coins.sort((a, b) => {
      const indexA = romanOrder.indexOf(a.category);
      const indexB = romanOrder.indexOf(b.category);
      return order === 'asc' ? indexA - indexB : indexB - indexA;
    });
  }

  private sortAlphabetically(order: 'asc' | 'desc'): void {
    this.coins.sort((a, b) => {
      const comparison = a.symbol.localeCompare(b.symbol);
      return order === 'asc' ? comparison : -comparison;
    });
  }

  onGoToCoinMetrics(timeframe: TF) {
    const coins = this.selectionService.selectedValues();
    if (coins.length === 0) return;

    for (const coin of coins) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([COIN_METRICS], {
          queryParams: {
            symbol: coin.symbol,
            timeframe,
            imageUrl: coin.imageUrl,
          },
        })
      );
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        this.openedWindows.push(newWindow);
      }
    }
  }

  onGoToComparison(timeframe: TF) {}

  closeWindows(): void {
    for (const win of this.openedWindows) {
      if (win && !win.closed) {
        win.close();
      }
    }
    this.openedWindows = [];
    console.log('All opened windows closed.');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
