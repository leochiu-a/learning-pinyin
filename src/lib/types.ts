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

/** 一道練習題：漢字（可空）、每個音節的數字標調拼音與注音、出自第幾課 */
export interface Item {
  h: string;
  syl: string[];
  zs: string[];
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
