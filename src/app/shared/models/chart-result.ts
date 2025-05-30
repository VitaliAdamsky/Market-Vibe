import { EChartsOption } from 'echarts';

export type ChartResult = {
  options: EChartsOption;
  symbol: string;
  imageUrl: string;
  category: string;
  exchanges: string[];
};
