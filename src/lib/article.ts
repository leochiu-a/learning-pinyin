import { ARTICLES } from '../data/articles';
import type { Article, Syllables } from './types';
import { toZhuyin } from './zhuyin';

const HAN = /\p{Script=Han}/u;

/** 文章裡的一個字；漢字有要打的拼音，標點沒有 */
export interface ArticleChar {
  ch: string;
  target: Syllables | null;
}

export interface BuiltArticle extends Article {
  chars: ArticleChar[];
  /** 要打的字在 chars 裡的位置 */
  slots: number[];
  /** 換行時不拆開的字；標點黏在前一個字後面，避免標點出現在行首 */
  groups: number[][];
}

export function buildArticle(a: Article): BuiltArticle {
  const syllables = a.pinyin.trim().split(/\s+/);
  let n = 0;
  const chars = [...a.text].map(ch => {
    if (!HAN.test(ch)) return { ch, target: null };
    const syl = syllables[n++];
    const zy = syl ? toZhuyin(syl) : null;
    if (!syl || !zy) throw new Error(`文章「${a.title}」的「${ch}」拼音有誤：${syl ?? '缺少拼音'}`);
    return { ch, target: { h: ch, syl: [syl], zs: [zy] } };
  });
  if (n !== syllables.length) throw new Error(`文章「${a.title}」有 ${n} 個字，但拼音有 ${syllables.length} 個`);
  const groups: number[][] = [];
  chars.forEach((c, i) => {
    if (!c.target && groups.length) groups[groups.length - 1].push(i);
    else groups.push([i]);
  });
  return { ...a, chars, slots: chars.flatMap((c, i) => (c.target ? [i] : [])), groups };
}

export const ARTICLE_LIST = ARTICLES.map(buildArticle);

export const findArticle = (id: string | undefined) => ARTICLE_LIST.find(a => a.id === id);

/** 每分鐘打幾個字 */
export const charsPerMinute = (chars: number, ms: number) => (ms > 0 ? Math.round((chars * 60000) / ms) : 0);
