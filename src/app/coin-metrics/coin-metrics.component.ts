import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartResult } from '../shared/models/chart-result';
import { TF } from '../shared/models/timeframes';
import { COIN_METRICS } from 'src/consts/url-consts';
import { Coin } from '../shared/models/coin';

@Component({
  selector: 'app-coin-metrics',
  templateUrl: './coin-metrics.component.html',
  styleUrls: ['./coin-metrics.component.css'],
})
export class CoinMetricsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  TF = TF;
  coins!: Coin[];
  title = 'Coin Metrics';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const uuid = params['uuid'];
      if (!uuid) {
        console.warn('UUID не найден в параметрах');
        return;
      }

      const key = `${COIN_METRICS}_${uuid}`;
      const stored = localStorage.getItem(key);

      if (stored) {
        try {
          this.coins = JSON.parse(stored);
          console.log('Полученные монеты:', this.coins);

          // Очистка после использования
          //localStorage.removeItem(key);
        } catch (e) {
          console.error('Не удалось распарсить данные');
          localStorage.removeItem(key);
        }
      } else {
        console.warn('Нет данных для UUID:', uuid);
      }
    });
  }
}
