import { describe, expect, it } from 'vitest';
import { cleanInput, hintAt, isComplete, match, targetOf } from './answer';
import { COURSE, TONE_IDX, parseLine } from './course';

const item = (line: string, li = TONE_IDX + 1) => parseLine(line, li);

describe('tones', () => {
  const taiwan = item('台灣 tai2,wan1 ㄊㄞ,ㄨㄢ');

  it('skips tone digits when tones are off', () => {
    expect(targetOf(taiwan, false)).toBe('taiwan');
    expect(isComplete(taiwan, false, 'taiwan')).toBe(true);
  });

  it('requires tone digits when tones are on', () => {
    expect(isComplete(taiwan, true, 'taiwan')).toBe(false);
    expect(isComplete(taiwan, true, 'tai2wan1')).toBe(true);
  });

  it('never requires tones before the tone lesson', () => {
    expect(targetOf(item('爸 ba4 ㄅㄚ', TONE_IDX - 1), true)).toBe('ba');
  });

  it('accepts a neutral tone with or without 5', () => {
    const ma = item('嗎 ma5 ㄇㄚ');
    expect(isComplete(ma, true, 'ma')).toBe(true);
    expect(isComplete(ma, true, 'ma5')).toBe(true);
    expect(isComplete(item('馬 ma3 ㄇㄚ'), true, 'ma')).toBe(false);
  });
});

describe('match / hintAt', () => {
  it('finds where the typing went wrong', () => {
    const xin = item('心 xin1 ㄒㄧㄣ');
    const m = match(xin, false, 'xq');
    expect(m.k).toBe(1);
    expect(hintAt(xin, m.k, m.segs)).toMatchObject({ key: 'i' });
  });

  it('names the tone when a digit is wrong', () => {
    const horse = item('馬 ma3 ㄇㄚ');
    const m = match(horse, true, 'ma4');
    expect(hintAt(horse, m.k, m.segs)).toMatchObject({ key: '3' });
    expect(hintAt(horse, m.k, m.segs).text).toContain('三聲');
  });
});

describe('cleanInput', () => {
  it('drops spaces and apostrophes and maps ü to v', () => {
    expect(cleanInput("Zao3 'An1")).toEqual({ ok: true, value: 'zao3an1' });
    expect(cleanInput('lü4')).toEqual({ ok: true, value: 'lv4' });
  });
  it('flags zhuyin IME input and stray symbols', () => {
    expect(cleanInput('ㄊ')).toEqual({ ok: false, reason: 'ime' });
    expect(cleanInput('ma-')).toEqual({ ok: false, reason: 'symbol' });
  });
});

describe('course data', () => {
  it('has matching pinyin and zhuyin syllables for every item', () => {
    for (const l of COURSE) {
      for (const it of l.pool) expect(it.zs.length, `${l.id} ${it.h}`).toBe(it.syl.length);
      for (const it of l.pool.filter(x => x.h)) expect([...it.h].length, `${l.id} ${it.h}`).toBe(it.syl.length);
    }
  });
});
