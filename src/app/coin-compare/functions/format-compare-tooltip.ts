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

  // Получаем время из первой монеты (предполагается, что у всех одинаковое)
  const openTime = allCoinData[0]?.[index]?.openTime ?? 0;
  const closeTime = allCoinData[0]?.[index]?.closeTime ?? 0;

  // Функция форматирования времени
  const formatDate = (time: number): string =>
    new Date(time).toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    });

  // Вспомогательная функция для удаления пары
  function stripPair(symbol: string): string {
    return symbol.replace(/(USDT|BUSD|USD|PERP)$/i, '');
  }

  // Строим строки для каждой монеты на основе данных из params
  const rows = params
    .filter((p: any) => p.seriesName && p.color && p.value !== undefined) // фильтруем только валидные данные
    .map((p: any, i: any) => {
      const symbol = stripPair(p.seriesName); // например, BTCUSDT → BTC
      const change = p.value ? `${parseFloat(p.value).toFixed(1)}%` : '–';
      const color = p.color || '#ccc'; // если цвет не найден — дефолтный

      return `
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 2px 0;
        ">
          <div style="
            display: flex;
            align-items: center;
            gap: 6px;
          ">
            <span style="
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: ${color};
              margin-right: 4px;
            "></span>
            <span>${stripPair(symbol)}</span>
          </div>
          <span style="color: #ccc; font-weight: bold;">${change}</span>
        </div>
      `;
    })
    .join('');

  // HTML tooltip'а
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
