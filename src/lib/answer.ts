import { TONE_IDX } from './course';
import { ruleFor, stripTone } from './pinyin';
import type { Item } from './types';

/** 第 4 步之後的題目才考聲調；toneOn 為 false 時一律只考字母 */
export const needsTone = (it: Item, toneOn: boolean) =>
  toneOn && it.li >= TONE_IDX && it.syl.some(s => /[1-5]$/.test(s));

/** 每種可接受的打法（音節陣列），第一個是標準答案；輕聲的 5 可打可不打 */
export function variantsOf(it: Item, toneOn: boolean) {
  const tone = needsTone(it, toneOn);
  let vs: string[][] = [[]];
  for (const s of it.syl) {
    const base = stripTone(s);
    const opts = !tone ? [base] : s.endsWith('5') ? [s, base] : [s];
    vs = vs.flatMap(v => opts.map(o => [...v, o]));
  }
  return vs;
}

export const targetOf = (it: Item, toneOn: boolean) => variantsOf(it, toneOn)[0].join('');

export const isComplete = (it: Item, toneOn: boolean, v: string) => variantsOf(it, toneOn).some(s => s.join('') === v);

export interface Match {
  segs: string[];
  tgt: string;
  /** 從頭算起打對了幾個字 */
  k: number;
}

/** 挑出和目前輸入最接近的打法 */
export function match(it: Item, toneOn: boolean, v: string): Match {
  let best: Match | null = null;
  for (const segs of variantsOf(it, toneOn)) {
    const tgt = segs.join('');
    let k = 0;
    while (k < v.length && v[k] === tgt[k]) k++;
    if (!best || k > best.k) best = { segs, tgt, k };
  }
  return best!;
}

/** 輸入只收英文字母和數字；空白和 ' 直接略過 */
export function cleanInput(raw: string): { ok: true; value: string } | { ok: false; reason: 'ime' | 'symbol' } {
  const v = raw.toLowerCase().replace(/ü/g, 'v').replace(/[\s']/g, '');
  if (/\P{ASCII}/u.test(v)) return { ok: false, reason: 'ime' };
  if (/[^a-z0-9]/.test(v)) return { ok: false, reason: 'symbol' };
  return { ok: true, value: v };
}

export interface Hint {
  text: string;
  key?: string;
  after?: string;
}

const TONE_NAME = ['', '一', '二', '三', '四', '輕'];
const TONE_MARK = ['', 'ˉ', 'ˊ', 'ˇ', 'ˋ'];

/** 在第 k 個字打錯時，告訴使用者該怎麼打 */
export function hintAt(it: Item, k: number, segs: string[]): Hint {
  let pos = 0;
  let si = 0;
  for (; si < segs.length; si++) {
    if (k < pos + segs[si].length) break;
    pos += segs[si].length;
  }
  si = Math.min(si, segs.length - 1);
  const ch = segs.join('')[k];
  if (ch === undefined) return { text: '打太多了，把多出來的字母刪掉。' };
  if (/\d/.test(ch)) {
    const t = +ch;
    const who = it.h[si] ? `「${it.h[si]}」` : '這個音節';
    return t === 5
      ? { text: `${who}是輕聲，打 `, key: '5', after: ' 或直接打下一個音節都可以。' }
      : { text: `${who}是${TONE_NAME[t]}聲（${TONE_MARK[t]}），在音節後面打 `, key: ch, after: '。' };
  }
  return { text: `${ruleFor(it.zs[si], stripTone(it.syl[si]))} 下一個字母是 `, key: ch, after: '。' };
}

/** 看答案時列出這題用到的規則 */
export const rulesOf = (it: Item) => [...new Set(it.syl.map((s, i) => ruleFor(it.zs[i], stripTone(s))))];
