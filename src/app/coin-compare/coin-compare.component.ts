import { EChartsOption, time } from 'echarts';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Coin } from '../shared/models/coin';
import { SelectionService } from '../shared/services/selection.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TF } from '../shared/models/timeframes';
import { COIN_COMPARE, COIN_METRICS } from 'src/consts/url-consts';
import { CoinCompareBuilderService } from './services/coin-compare-builder.service';

@Component({
  selector: 'app-coin-compare',
  templateUrl: './coin-compare.component.html',
  styleUrls: ['./coin-compare.component.css'],
})
export class CoinCompareComponent implements OnInit, OnDestroy {
  title = 'Coin Comparison';
  subtitle = `Timeframe`;
  coins: Coin[] = [];
  timeframe!: TF;
  subscribtion: Subscription = new Subscription();
  oiChartOptions!: EChartsOption | null;
  closePriceChartOptions!: EChartsOption | null;
  volumeChartOptions!: EChartsOption | null;
  volumeDeltaChartOptions!: EChartsOption | null;
  buyerRatioChartOptions!: EChartsOption | null;
  frChartOptions!: EChartsOption | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chartService: CoinCompareBuilderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.timeframe = params['timeframe'] || TF.h4;
      this.subtitle = `Timeframe ${this.timeframe}`;
      const uuid = params['uuid'];
      if (!uuid) {
        console.warn('UUID не найден в параметрах');
        return;
      }

      const key = `${COIN_COMPARE}_${uuid}`;
      const stored = localStorage.getItem(key);

      if (stored) {
        try {
          this.coins = JSON.parse(stored);
          console.log('Полученные монеты:', this.coins);
          this.loadOiChart();

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

  async loadOiChart() {
    if (this.coins && this.coins.length > 0) {
      this.oiChartOptions = await this.chartService.buildMetricChart(
        this.coins,
        this.timeframe,
        {
          type: 'oi',
          title: 'Open Interest',
          valueKey: 'normalizedOpenInterest',
          tooltipKey: 'openInterestChange',
        }
      );
      this.closePriceChartOptions = await this.chartService.buildMetricChart(
        this.coins,
        this.timeframe,
        {
          type: 'kline',
          title: 'Close Price',
          valueKey: 'normalizedClosePrice',
          tooltipKey: 'closePriceChange',
        }
      );
      this.volumeChartOptions = await this.chartService.buildMetricChart(
        this.coins,
        this.timeframe,
        {
          type: 'kline',
          title: 'Quote Volume',
          valueKey: 'normalizedQuoteVolume',
          tooltipKey: 'quoteVolumeChange',
        }
      );
      this.volumeDeltaChartOptions = await this.chartService.buildMetricChart(
        this.coins,
        this.timeframe,
        {
          type: 'kline',
          title: 'Volume Delta',
          valueKey: 'normalizedVolumeDelta',
          tooltipKey: 'volumeDeltaChange',
        }
      );
      this.buyerRatioChartOptions = await this.chartService.buildMetricChart(
        this.coins,
        this.timeframe,
        {
          type: 'kline',
          title: 'Buyer Ratio',
          valueKey: 'normalizedBuyerRatio',
          tooltipKey: 'buyerRatioChange',
        }
      );
      this.frChartOptions = await this.chartService.buildMetricChart(
        this.coins,
        this.timeframe,
        {
          type: 'fr',
          title: 'Funding Rate',
          valueKey: 'normalizedFundingRate',
          tooltipKey: 'fundingRateChange',
        }
      );
    } else {
      this.oiChartOptions = null;
    }
  }

  onGoToMetrics(coin: Coin) {
    const url = this.router
      .createUrlTree([COIN_METRICS], {
        queryParams: {
          symbol: coin.symbol,
          timeframe: this.timeframe,
          imageUrl: encodeURIComponent(coin.imageUrl),
        },
      })
      .toString();

    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
