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
  level: '入門' | '進階' | '挑戰';
  /** 主題，例如 冷知識、台灣、生活、時事、故事、古詩 */
  topic: string;
  /** 加入的日期 YYYY-MM-DD */
  added: string;
  /** 內容參考的來源；文章是改寫過的短文，不是原文 */
  source?: { name: string; url: string };
  text: string;
  /** 依序對應 text 裡每個漢字的數字標調拼音，以空白分隔 */
  pinyin: string;
}

/** 一篇文章打完的成績：每分鐘字數與第一次就打對的比例 */
export interface ArticleRecord {
  cpm: number;
  acc: number;
}

/** 一個字第一次出錯的地方：聲母、聲母以外的拼法（含看答案），或聲調數字 */
export type Slip = 'initial' | 'final' | 'tone';
