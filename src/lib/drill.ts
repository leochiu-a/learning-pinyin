import { ARTICLE_LIST } from './article';
import { COURSE } from './course';
import { ruleOf, splitInitial, stripTone, toneOf } from './pinyin';
import type { Slip, Syllables } from './types';

export interface Miss {
  target: Syllables;
  slip: Slip;
}

/** 針對練習的一張題卡：連續打對 need 次才算過 */
export interface Card {
  target: Syllables;
  /** 為什麼出這題 */
  reason: string;
  need: number;
  streak: number;
}

const TONE_NAME = ['', '一', '二', '三', '四', '輕'];
const keyOf = (t: Syllables) => `${t.h}|${t.syl.join(',')}`;

/** 可以拿來出題的單字：課程裡有漢字的單音節題目，加上所有文章裡的字 */
export const BANK: Syllables[] = (() => {
  const all = [
    ...COURSE.flatMap(l => l.pool).filter(it => it.h && it.syl.length === 1),
    ...ARTICLE_LIST.flatMap(a => a.chars.flatMap(c => (c.target ? [c.target] : []))),
  ];
  const seen = new Map<string, Syllables>();
  for (const it of all) if (!seen.has(keyOf(it))) seen.set(keyOf(it), { h: it.h, syl: it.syl, zs: it.zs });
  return [...seen.values()];
})();

/** 這個字錯的那一類：錯在聲母就找同聲母、錯在聲調就找同聲調、其他找同一條拼寫規則 */
export function slipRule(t: Syllables, slip: Slip): { id: string; label: string } {
  const p = stripTone(t.syl[0]);
  if (slip === 'tone') {
    const n = toneOf(t.syl[0]);
    return { id: `tone:${n}`, label: `${TONE_NAME[n]}聲` };
  }
  const initial = splitInitial(p)[0];
  if (slip === 'initial' && initial) return { id: `initial:${initial}`, label: `聲母 ${t.zs[0][0]} 寫 ${initial}` };
  return ruleOf(t.zs[0], p);
}

const similarKey = (t: Syllables, slip: Slip) => slipRule(t, slip).id;

function reasonFor(t: Syllables, slip: Slip) {
  const { label } = slipRule(t, slip);
  return slip === 'tone' ? `同樣是${label}` : `同一條規則：${label}`;
}

function shuffle<T>(a: T[], random: () => number) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/**
 * 把打錯的字排成練習：每個錯字後面接 perMiss 個用同一條規則（或同聲調）的字。
 * 錯字要連續打對兩次，類似的字打對一次就好。
 */
export function makeDrill(misses: Miss[], bank: Syllables[] = BANK, perMiss = 2, random = Math.random): Card[] {
  const used = new Set<string>();
  const cards: Card[] = [];
  for (const m of misses) {
    if (used.has(keyOf(m.target))) continue;
    used.add(keyOf(m.target));
    cards.push({ target: m.target, reason: '剛剛打錯的字', need: 2, streak: 0 });
    const key = similarKey(m.target, m.slip);
    const related = shuffle(
      bank.filter(b => b.h !== m.target.h && !used.has(keyOf(b)) && similarKey(b, m.slip) === key),
      random,
    ).slice(0, perMiss);
    for (const r of related) {
      used.add(keyOf(r));
      cards.push({ target: r, reason: reasonFor(m.target, m.slip), need: 1, streak: 0 });
    }
  }
  return cards;
}

/** 打完目前這張卡之後的佇列：沒過關的卡插回兩張之後再考 */
export function advance(queue: Card[], firstTry: boolean): Card[] {
  const [head, ...rest] = queue;
  const card = firstTry ? { ...head, streak: head.streak + 1 } : { ...head, streak: 0, need: 2 };
  if (card.streak >= card.need) return rest;
  const at = Math.min(2, rest.length);
  return [...rest.slice(0, at), card, ...rest.slice(at)];
}
