// metric.service.ts
import { Injectable } from '@angular/core';
import { Metric } from '../models/metric';
import { BehaviorSubject } from 'rxjs';
import { metrics } from 'src/assets/data/metrics';
import { TF } from '../models/timeframes';

@Injectable({
  providedIn: 'root',
})
export class MetricService {
  private readonly metrics: Metric[] = metrics;

  private metricSource = new BehaviorSubject<Metric>(this.metrics[0]);

  currentMetric$ = this.metricSource.asObservable();

  /**
   * Change metric by propertyName (e.g., 'fundingRate')
   */
  changeMetricByPropertyName(propertyName: string) {
    const metric = this.metrics.find((m) => m.propertyName === propertyName);
    if (metric) {
      this.metricSource.next(metric);
    } else {
      console.warn(`Metric with propertyName "${propertyName}" not found`);
    }
  }

  changeMetricByPropertyNameAndTimeframe(propertyName: string, timeframe: TF) {
    const metric = this.metrics.find(
      (m) => m.propertyName === propertyName && m.timeframe === timeframe
    );
    if (metric) {
      this.metricSource.next(metric);
    } else {
      console.warn(`Metric with propertyName "${propertyName}" not found`);
    }
  }

  /**
   * Get metric by propertyName
   */
  getMetricByPropertyName(propertyName: string): Metric | undefined {
    return this.metrics.find((m) => m.propertyName === propertyName);
  }

  getMetricByPropertyNameAndTimeframe(
    propertyName: string,
    timeframe: TF
  ): Metric | undefined {
    return this.metrics.find(
      (m) => m.propertyName === propertyName && m.timeframe === timeframe
    );
  }

  /**
   * Get observable of current metric
   */
  getCurrentMetric() {
    return this.metricSource.getValue();
  }
}
