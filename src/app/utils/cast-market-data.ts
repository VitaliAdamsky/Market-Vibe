import { DataType, DataTypeMap } from '../shared/models/data-type';

export function castMarketData<T extends DataType>(
  type: T,
  data: unknown
): DataTypeMap[T][] {
  return data as DataTypeMap[T][];
}
