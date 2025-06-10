import { OpenInterestItem } from 'src/app/shared/models/oi';

/**
 * Форматирует tooltip для сравнения OI нескольких монет
 */
export function formatCompareTooltip(
  params: any,
  allCoinData: OpenInterestItem[][]
): string {
  if (!params.length || params[0].dataIndex === undefined) return '';

  const index = params[0].dataIndex;

  // Получаем время из первой монеты (предполагается, что все монеты имеют одинаковое время)
  const openTime = allCoinData[0]?.[index]?.openTime ?? 0;
  const closeTime = allCoinData[0]?.[index]?.closeTime ?? 0;

  const formatDate = (time: number): string =>
    new Date(time).toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    });

  // Строим строки для каждой монеты
  const rows = allCoinData
    .filter((data) => data[index]) // чтобы не было undefined
    .map((data) => {
      const item = data[index];
      return `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>${stripPair(item.symbol)}</span>
          <span style="color: #ccc; font-weight: bold;">${
            item.openInterestChange
          }%</span>
        </div>
      `;
    })
    .join('');

  // Полный HTML для tooltip
  return `
    <div style="
      background: #2f2f2f;
      color: #f1f1f1;
      padding: 10px;
      border-radius: 6px;
      font-size: 13px;
      line-height: 1.6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
      min-width: 160px;
    ">
      <div><span style="color:#aaa;">Open:</span> ${formatDate(openTime)}</div>
      <div><span style="color:#aaa;">Close:</span> ${formatDate(
        closeTime
      )}</div>
      <hr style="border: none; border-top: 1px solid #444; margin: 6px 0" />
      ${rows}
    </div>
  `;
}

function stripPair(symbol: string): string {
  return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
}
