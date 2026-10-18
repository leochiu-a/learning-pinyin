/** 當地日期換算成第幾天（1970-01-01 是第 0 天），過午夜就換一天 */
export const dayNumber = (date: Date) =>
  Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);

/** YYYY-MM-DD，用當地日期 */
export const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// 固定種子的亂數，讓同一份文章清單每次排出來的順序都一樣
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

/**
 * 今天的 count 篇：把清單用固定順序洗牌後，每天往後取 count 篇。
 * 清單沒變的話，全部輪過一次之前不會重複。
 */
export function dailyPicks<T>(list: T[], date: Date, count = 3): T[] {
  if (!list.length) return [];
  const random = seeded(list.length);
  const order = list.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const n = Math.min(count, list.length);
  const start = (dayNumber(date) * n) % list.length;
  return Array.from({ length: n }, (_, k) => list[order[(start + k) % list.length]]);
}

/** 加入不到 days 天的算新文章 */
export const isNew = (added: string, today: Date, days = 7) =>
  dayNumber(today) - dayNumber(new Date(`${added}T00:00:00`)) < days;
