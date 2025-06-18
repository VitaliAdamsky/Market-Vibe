import { Injectable } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { TF } from 'src/app/shared/models/timeframes';
import { LABELS_MAP } from 'src/app/shared/functions/labels-map';

export interface SentimentMetricItem {
  symbol: string;
  [key: string]: any; // любые ключи, включая metricKey и metricKeyColor
}

@Injectable({ providedIn: 'root' })
export class DoughnutChartService {
  createChart(
    data: SentimentMetricItem[],
    metricKey: string,
    timeframe: TF
  ): EChartsOption {
    let positive = 0;
    let negative = 0;

    data.forEach((item) => {
      const value = item[metricKey];
      if (typeof value === 'number') {
        if (value >= 0) positive++;
        else if (value < 0) negative++;
      }
    });

    const chartData = [
      {
        value: positive,
        name: 'Positive',
        itemStyle: { color: '#4caf50' }, // зелёный
      },
      {
        value: negative,
        name: 'Negative',
        itemStyle: { color: '#f44336' }, // красный
      },
    ];

    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 8,
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
      },
      title: {
        show: true,
        text: LABELS_MAP[metricKey] + ` ${timeframe}`,
        left: 'center',
        top: '2%',
        textStyle: {
          color: '#ccc',
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      legend: {
        orient: 'horizontal',
        top: '10%',
        left: 'center',
        textStyle: {
          color: '#ccc',
        },
      },
      series: [
        {
          name: metricKey,
          type: 'pie',
          radius: ['50%', '70%'], // donut
          center: ['50%', '55%'], // ниже, чтобы освободить верх
          startAngle: 180,
          endAngle: 360,
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: '{b}\n{c}',
            fontSize: 14,
            color: '#fff',
            lineHeight: 18,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: positive,
              name: 'Positive',
              itemStyle: { color: '#4caf50' },
            },
            {
              value: negative,
              name: 'Negative',
              itemStyle: { color: '#f44336' },
            },
          ],
        },
      ],
    };

    return option;
  }
}
