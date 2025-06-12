import { TooltipSyncService } from './../../shared/services/tooltip-sync.service';
import { DataType, DataTypeMap } from 'src/app/shared/models/data-type';

export type Primitive = string | number | boolean | null;

export type PrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends Primitive ? K : never;
}[keyof T];

export interface MetricCompareConfig<K extends DataType> {
  type: K;
  title: string;
  valueKey: PrimitiveKeys<DataTypeMap[K]['data'][number]>;
  tooltipKey: PrimitiveKeys<DataTypeMap[K]['data'][number]>;
}
