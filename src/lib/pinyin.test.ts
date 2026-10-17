import { describe, expect, it } from 'vitest';

import { parseLine } from './course';
import { mark, pyOf, ruleFor, zyList } from './pinyin';

describe('mark', () => {
  it.each([
    ['hao3', 'hǎo'],
    ['liu4', 'liù'],
    ['dui4', 'duì'],
    ['lv4', 'lǜ'],
    ['er4', 'èr'],
    ['zhong1', 'zhōng'],
    ['yue4', 'yuè'],
    ['xiong2', 'xióng'],
    ['ma5', 'ma'],
    ['v', 'ü'],
  ])('%s → %s', (input, out) => expect(mark(input)).toBe(out));
});

describe('pyOf / zyList', () => {
  it('adds an apostrophe before a/o/e syllables', () => {
    expect(pyOf(parseLine('早安 zao3,an1 ㄗㄠ,ㄢ', 0))).toBe("zǎo'ān");
  });
  it('puts the neutral-tone dot in front', () => {
    expect(zyList(parseLine('嗎 ma5 ㄇㄚ', 0))).toEqual(['˙ㄇㄚ']);
    expect(zyList(parseLine('台灣 tai2,wan1 ㄊㄞ,ㄨㄢ', 0))).toEqual(['ㄊㄞˊ', 'ㄨㄢ']);
  });
});

describe('ruleFor', () => {
  it.each([
    ['ㄓ', 'zhi', '補上 i'],
    ['ㄧ', 'yi', '單獨的 ㄧ'],
    ['ㄐㄩ', 'ju', 'ㄐㄑㄒ'],
    ['ㄌㄩ', 'lv', 'v 代替'],
    ['ㄌㄧㄡ', 'liu', 'iu'],
    ['ㄉㄨㄟ', 'dui', 'ui'],
    ['ㄔㄨㄣ', 'chun', 'un'],
    ['ㄒㄩㄥ', 'xiong', 'iong'],
    ['ㄉㄨㄥ', 'dong', 'ong'],
    ['ㄒㄧㄣ', 'xin', 'ien'],
  ])('%s %s mentions %s', (z, p, part) => expect(ruleFor(z, p)).toContain(part));
});
