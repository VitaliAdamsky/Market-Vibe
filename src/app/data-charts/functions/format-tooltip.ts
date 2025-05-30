import { DataType } from 'src/app/shared/models/data-type';
import { FundingRateItem } from 'src/app/shared/models/fr';
import { KlineDataItem } from 'src/app/shared/models/kline';
import { OpenInterestItem } from 'src/app/shared/models/oi';

export function formatTooltip(
  params: any,
  data: KlineDataItem[] | OpenInterestItem[] | FundingRateItem[],
  dataType: DataType,
  propertyKey?: keyof KlineDataItem
): string {
  const index = params[0].dataIndex;

  const format = (dateStr: number) =>
    new Date(dateStr).toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    });

  let openTime = 0;
  let closeTime = 0;
  let content = '';

  if (dataType === 'oi') {
    const point = data[index] as OpenInterestItem;
    openTime = point.openTime;
    closeTime = point.closeTime;
    content = `<div><span style="color:#aaa;">OI Change:</span> ${point.openInterestChange}%</div>`;
  } else if (dataType === 'fr') {
    const point = data[index] as FundingRateItem;
    openTime = point.openTime;
    closeTime = point.closeTime;
    content = `<div><span style="color:#aaa;">FR Change:</span> ${point.fundingRateChange}%</div>`;
  } else {
    const point = data[index] as KlineDataItem;
    openTime = point.openTime;
    closeTime = point.closeTime;

    const parts: string[] = [];

    const fields: [keyof KlineDataItem, string][] = [
      ['closePriceChange', 'Price Change'],
      ['quoteVolumeChange', 'Volume Change'],
      ['buyerRatioChange', 'Buyer Ratio Chg'],
      ['volumeDeltaChange', 'Volume Δ Change'],
    ];

    for (const [key, label] of fields) {
      if (point[key] != null) {
        parts.push(
          `<div><span style="color:#aaa;">${label}:</span> ${point[key]}%</div>`
        );
      }
    }

    content = parts.join('');
  }

  return `
    <div style="
      background: #2f2f2f;
      color: #f1f1f1;
      padding: 10px;
      border-radius: 6px;
      font-size: 13px;
      line-height: 1.6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    ">
      <div><span style="color:#aaa;">Open:</span> ${format(openTime)}</div>
      <div><span style="color:#aaa;">Close:</span> ${format(closeTime)}</div>
      ${content}
    </div>
  `;
}
