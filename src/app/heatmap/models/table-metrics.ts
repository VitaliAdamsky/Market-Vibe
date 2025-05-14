export interface TableMetricItem {
  openTime: number;
  displayedColorValue: string;
  tooltipText: string;
}

export interface TableDataRow {
  symbol: string;
  imageUrl: string;
  category: string;
  exchanges: string[];
  data: TableMetricItem[];
}

export interface TableData {
  title: string;
  data: TableDataRow[];
}
