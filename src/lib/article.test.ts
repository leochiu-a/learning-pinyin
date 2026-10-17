import { describe, expect, it } from 'vitest';

import { ARTICLES } from '../data/articles';
import { ARTICLE_LIST, buildArticle, charsPerMinute } from './article';

describe('articles', () => {
  it('gives every Chinese character exactly one valid syllable', () => {
    expect(() => ARTICLES.map(buildArticle)).not.toThrow();
  });

  it('skips punctuation when picking characters to type', () => {
    const a = buildArticle({ id: 't', title: 't', level: '', text: '早安！謝謝。', pinyin: 'zao3 an1 xie4 xie4' });
    expect(a.slots).toEqual([0, 1, 3, 4]);
    expect(a.groups).toEqual([[0], [1, 2], [3], [4, 5]]);
    expect(a.chars[3].target).toEqual({ h: '謝', syl: ['xie4'], zs: ['ㄒㄧㄝ'] });
  });

  it('reports a missing or extra syllable', () => {
    expect(() => buildArticle({ id: 't', title: 't', level: '', text: '早安', pinyin: 'zao3' })).toThrow('缺少拼音');
    expect(() => buildArticle({ id: 't', title: 't', level: '', text: '早', pinyin: 'zao3 an1' })).toThrow(
      '拼音有 2 個',
    );
  });

  it('has unique ids', () => {
    expect(new Set(ARTICLE_LIST.map(a => a.id)).size).toBe(ARTICLE_LIST.length);
  });
});

describe('charsPerMinute', () => {
  it('scales characters to a minute', () => {
    expect(charsPerMinute(30, 60000)).toBe(30);
    expect(charsPerMinute(10, 30000)).toBe(20);
    expect(charsPerMinute(5, 0)).toBe(0);
  });
});
