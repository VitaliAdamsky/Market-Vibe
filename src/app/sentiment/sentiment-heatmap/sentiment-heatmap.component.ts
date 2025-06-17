import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MarketActivityStats } from 'src/app/shared/models/market-activity-stats';
import { PropertyMapping } from '../models/property-mapping';
import { TF } from 'src/app/shared/models/timeframes';
import { SentimentService } from '../services/sentiment.service';

@Component({
  selector: 'app-sentiment-heatmap',
  templateUrl: './sentiment-heatmap.component.html',
  styleUrls: ['./sentiment-heatmap.component.css'],
})
export class SentimentHeatmapComponent implements OnChanges {
  @Input() metricKey!: string;
  @Input() data: MarketActivityStats[] = [];
  @Input() timeframe!: TF;
  title = '';
  heatmapData: any[] = [];
  constructor() {}
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.title = PropertyMapping[this.metricKey] + ` ${this.timeframe}`;

    if (changes['data'] && this.data?.length) {
      this.heatmapData = this.generateHeatmapRows(this.data, this.metricKey);
      console.log('Heatmap built:', this.heatmapData);
    }
  }

  generateHeatmapRows(data: MarketActivityStats[], metricKey: string): any[] {
    const values = data.map(
      (item) => Math.round(Number((item as any)[metricKey]) * 10) / 10
    );
    const max = Math.max(...values);
    const min = Math.min(...values);

    const getColor = (value: number): string => {
      const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));

      if (value > 0) {
        const ratio = clamp(value / max, 0, 1);
        const green = Math.round(255 * (1 - ratio));
        return `rgb(${green}, 255, ${green})`; // бело-зелёный → тёмно-зелёный
      } else if (value < 0) {
        const ratio = clamp(value / min, 0, 1); // value и min < 0 → положительное отношение
        const red = Math.round(255 * (1 - ratio));
        return `rgb(255, ${red}, ${red})`; // бело-красный → тёмно-красный
      } else {
        return `rgb(255, 255, 255)`; // ноль — белый
      }
    };

    return data
      .map((item) => {
        const anyItem = item as any;
        const value = Math.round(Number((anyItem as any)[metricKey]) * 10) / 10;
        return {
          symbol: item.symbol,
          value,
          color: getColor(value),
          full: item,
        };
      })
      .sort((a, b) => a.value - b.value);
  }

  showDetails(item: MarketActivityStats) {
    console.log('Clicked:', item);
  }
}
