export function getIntervalLabel(intervalMs: number): string {
  const hours = intervalMs / (1000 * 60 * 60);
  return `${hours}h`;
}
