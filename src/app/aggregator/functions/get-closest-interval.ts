const STANDARD_INTERVALS_MIN = [60, 120, 240, 480]; // 1h, 2h, 4h, 8h

export function getClosestInterval(minutes: number): number {
  let closest = STANDARD_INTERVALS_MIN[0];
  let minDiff = Math.abs(minutes - closest);

  for (let i = 1; i < STANDARD_INTERVALS_MIN.length; i++) {
    const diff = Math.abs(minutes - STANDARD_INTERVALS_MIN[i]);
    if (diff < minDiff) {
      closest = STANDARD_INTERVALS_MIN[i];
      minDiff = diff;
    }
  }

  return closest;
}
