export interface Row {
  z: string;
  p: string;
  ex?: string;
  note?: string;
}

export interface Lesson {
  id: string;
  title: string;
  sub: string;
  intro: string;
  rows: Row[];
  traps: string[];
  items: string;
}

/** 要打的字：漢字（可空）、每個音節的數字標調拼音與注音 */
export interface Syllables {
  h: string;
  syl: string[];
  zs: string[];
}

/** 課程的練習題，多記出自第幾課 */
export interface Item extends Syllables {
  li: number;
}

export interface Progress {
  done: Record<string, number>;
  all: boolean;
}

export interface Result {
  it: Item;
  ok: boolean;
}

/** 注音、拼音、補充說明、是否為容易打錯的格子 */
export type TableCell = [string, string, string?, number?];
export type TableGroup = [string, TableCell[]];

export interface Article {
  id: string;
  title: string;
  level: string;
  text: string;
  /** 依序對應 text 裡每個漢字的數字標調拼音，以空白分隔 */
  pinyin: string;
}

/** 一篇文章打完的成績：每分鐘字數與第一次就打對的比例 */
export interface ArticleRecord {
  cpm: number;
  acc: number;
}
