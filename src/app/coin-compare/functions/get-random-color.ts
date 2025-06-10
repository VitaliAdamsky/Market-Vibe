export function getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 30);
  const lightness = 50 + Math.floor(Math.random() * 10);

  return hslToHex(hue, saturation, lightness);
}

// Конвертируем HSL в HEX
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;

  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };

  // 🔥 Вот тут была ошибка — нужно использовать backticks (`), а не просто решётку без них
  return `#${f(0)}${f(8)}${f(4)}`;
}
