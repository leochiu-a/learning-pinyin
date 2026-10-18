import { describe, expect, it } from 'vitest';

import { dailyPicks, dayNumber, isNew, isoDate } from './daily';

const list = Array.from({ length: 10 }, (_, i) => `a${i}`);
const day = (d: number) => new Date(2026, 9, d, 9, 30);

describe('dailyPicks', () => {
  it('is the same all day and changes the next day', () => {
    expect(dailyPicks(list, new Date(2026, 9, 18, 0, 5))).toEqual(dailyPicks(list, new Date(2026, 9, 18, 23, 55)));
    expect(dailyPicks(list, day(18))).not.toEqual(dailyPicks(list, day(19)));
  });

  it('shows every article before repeating', () => {
    const seen = new Set<string>();
    for (let d = 1; d <= 4; d++) for (const a of dailyPicks(list, day(d), 3)) seen.add(a);
    expect(seen.size).toBe(10);
    expect(new Set(dailyPicks(list, day(18))).size).toBe(3);
  });

  it('copes with short lists', () => {
    expect(dailyPicks(['x'], day(18))).toEqual(['x']);
    expect(dailyPicks([], day(18))).toEqual([]);
  });
});

describe('dates', () => {
  it('uses the local calendar day', () => {
    expect(dayNumber(new Date(2026, 9, 19, 0, 1)) - dayNumber(new Date(2026, 9, 18, 23, 59))).toBe(1);
    expect(isoDate(day(8))).toBe('2026-10-08');
  });

  it('marks articles added within a week as new', () => {
    expect(isNew('2026-10-12', day(18))).toBe(true);
    expect(isNew('2026-10-11', day(18))).toBe(false);
  });
});
