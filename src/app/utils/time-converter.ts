export function UnixToISO(unixTimestamp: number): string {
  const date = new Date(unixTimestamp);
  // Формат ISO 8601 с временем в UTC (например: 2025-06-26T12:34:56.789Z)
  return date.toISOString();
}

export function UnixToTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp);
  // Формат "YYYY-MM-DD HH:mm:ss"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы 0-11
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function UnixToNamedTimeRu(unixTimestamp: number): string {
  const date = new Date(unixTimestamp);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, // 24-часовой формат
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(date);
}
