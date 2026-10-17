import { LESSONS } from '../data/lessons';
import type { Item, Lesson, Progress, Row } from './types';

export interface CourseRow extends Row {
  exItem?: Item;
}

export interface CourseLesson extends Omit<Lesson, 'rows'> {
  rows: CourseRow[];
  pool: Item[];
  isMix: boolean;
}

export const PASS = 0.8;

export function parseLine(line: string, li: number): Item {
  const [h, p, z] = line.trim().split(/\s+/);
  return { h: h === '-' ? '' : h, syl: p.split(','), zs: z.split(','), li };
}

export const COURSE: CourseLesson[] = LESSONS.map((l, li) => ({
  ...l,
  isMix: l.id === 'mix',
  rows: l.rows.map(r => ({ ...r, exItem: r.ex ? parseLine(r.ex, li) : undefined })),
  pool: l.items.trim() ? l.items.trim().split('\n').map(s => parseLine(s, li)) : [],
}));

export const TONE_IDX = COURSE.findIndex(l => l.id === 'tone');

export const isDone = (p: Progress, i: number) => p.done[COURSE[i].id] != null;

export function isUnlocked(p: Progress, i: number) {
  if (p.all || i === 0) return true;
  if (COURSE[i].isMix) return Object.keys(p.done).length > 0;
  return isDone(p, i - 1);
}

/** 隨機挑戰從已完成的步驟出題，其他步驟用自己的題庫 */
export function poolFor(p: Progress, i: number) {
  const l = COURSE[i];
  if (!l.isMix) return l.pool;
  const pool = COURSE.filter((x, j) => !x.isMix && (p.all || isDone(p, j))).flatMap(x => x.pool);
  return pool.length ? pool : COURSE[0].pool;
}

export const quizSize = (i: number) => (COURSE[i].isMix ? 15 : 12);

const shuffle = <T,>(a: T[]) => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

/** 抽出 n 題；題庫不夠時重複洗牌接上，避免同一題連續出現 */
export function drawItems(pool: Item[], n: number) {
  let items: Item[] = [];
  while (items.length < n) {
    const batch = shuffle(pool);
    if (items.length && batch.length > 1 && batch[0] === items[items.length - 1]) batch.push(batch.shift()!);
    items = items.concat(batch);
  }
  return items.slice(0, n);
}

export const firstOpenLesson = (p: Progress) =>
  Math.max(0, COURSE.findIndex((l, i) => !l.isMix && isUnlocked(p, i) && !isDone(p, i)));
