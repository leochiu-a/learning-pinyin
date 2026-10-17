import { describe, expect, it } from 'vitest';

import { COURSE } from './course';
import { toZhuyin } from './zhuyin';

describe('toZhuyin', () => {
  it.each([
    ['zhi1', 'ㄓ'],
    ['xue2', 'ㄒㄩㄝ'],
    ['ju4', 'ㄐㄩ'],
    ['lv4', 'ㄌㄩ'],
    ['liu4', 'ㄌㄧㄡ'],
    ['dui4', 'ㄉㄨㄟ'],
    ['chun1', 'ㄔㄨㄣ'],
    ['jun1', 'ㄐㄩㄣ'],
    ['yong4', 'ㄩㄥ'],
    ['xiong2', 'ㄒㄩㄥ'],
    ['you3', 'ㄧㄡ'],
    ['wei4', 'ㄨㄟ'],
    ['yun2', 'ㄩㄣ'],
    ['ying1', 'ㄧㄥ'],
    ['er4', 'ㄦ'],
    ['bo1', 'ㄅㄛ'],
  ])('%s → %s', (py, zy) => expect(toZhuyin(py)).toBe(zy));

  it('rejects syllables it does not know', () => {
    expect(toZhuyin('xyz')).toBeNull();
  });

  it('agrees with every hand-written zhuyin in the course', () => {
    for (const l of COURSE)
      for (const x of l.pool) x.syl.forEach((s, i) => expect(toZhuyin(s), `${l.id} ${x.h} ${s}`).toBe(x.zs[i]));
  });
});
