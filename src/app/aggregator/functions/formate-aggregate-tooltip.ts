import { CallbackDataParams } from 'echarts/types/dist/shared';

export function formatAggregateTooltip(params: CallbackDataParams[]): string {
  if (!params || params.length === 0) return '';

  const firstParam = params[0];
  const openTime = (firstParam.data as any)?.openTime ?? 0;
  const closeTime = (firstParam.data as any)?.closeTime ?? 0;

  const formatDate = (time: number): string =>
    new Date(time).toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    });

  const rows = params
    .filter(
      (p) => typeof p.seriesName === 'string' && typeof p.value === 'number'
    )
    .map((p) => {
      const label = p.seriesName;
      const color = (p.color as string) ?? '#ccc';
      const value = `${p.value}`;

      return `
        <div style="display:flex;justify-content:space-between;align-items:center;margin:2px 0;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${color};margin-right:4px;"></span>
            <span>${label}</span>
          </div>
          <span style="color:#ccc;font-weight:bold;">${value}</span>
        </div>`;
    })
    .join('');

  return `
    <div style="
      background:#2f2f2f;
      color:#f1f1f1;
      padding:10px;
      font-size:13px;
      line-height:1.6;
      box-shadow:0 2px 8px rgba(0,0,0,0.6);
      border-radius:6px;
      min-width:160px;
    ">
      <div><span style="color:#aaa;">Open:</span> ${formatDate(openTime)}</div>
      <div><span style="color:#aaa;">Close:</span> ${formatDate(
        closeTime
      )}</div>
      <hr style="border:none;border-top:1px solid #444;margin:6px 0;" />
      ${rows}
    </div>`;
}
