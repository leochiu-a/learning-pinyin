import { describe, expect, it } from 'vitest';

import { BANK, advance, makeDrill, type Card } from './drill';
import type { Syllables } from './types';

const s = (h: string, syl: string, zs: string): Syllables => ({ h, syl: [syl], zs: [zs] });
const water = s('水', 'shui3', 'ㄕㄨㄟ');
const bank = [
  water,
  s('對', 'dui4', 'ㄉㄨㄟ'),
  s('會', 'hui4', 'ㄏㄨㄟ'),
  s('為', 'wei4', 'ㄨㄟ'),
  s('馬', 'ma3', 'ㄇㄚ'),
  s('好', 'hao3', 'ㄏㄠ'),
];

describe('makeDrill', () => {
  it('adds characters that use the same spelling rule', () => {
    const cards = makeDrill([{ target: water, slip: 'final' }], bank);
    expect(cards.map(c => c.target.h)).toEqual(expect.arrayContaining(['水', '對', '會']));
    expect(cards.map(c => c.target.h)).not.toContain('為');
    expect(cards[0]).toMatchObject({ need: 2, reason: '剛剛打錯的字' });
    expect(cards[1].reason).toContain('ㄨㄟ 有聲母時寫 ui');
  });

  it('adds characters with the same tone after a tone slip', () => {
    const cards = makeDrill([{ target: water, slip: 'tone' }], bank);
    expect(
      cards
        .slice(1)
        .map(c => c.target.h)
        .toSorted(),
    ).toEqual(['好', '馬']);
    expect(cards[1].reason).toBe('同樣是三聲');
  });

  it('does not repeat a character missed twice', () => {
    const cards = makeDrill(
      [
        { target: water, slip: 'final' },
        { target: water, slip: 'final' },
      ],
      bank,
    );
    expect(cards.filter(c => c.target.h === '水')).toHaveLength(1);
  });

  it('can find related characters in the real bank', () => {
    const cards = makeDrill([{ target: water, slip: 'final' }]);
    expect(cards.length).toBe(3);
    expect(BANK.length).toBeGreaterThan(200);
  });
});

const card = (h: string, need = 1): Card => ({ target: s(h, 'a1', 'ㄚ'), reason: '', need, streak: 0 });

describe('slip kinds', () => {
  it('groups an initial mistake with characters sharing that initial', () => {
    const pearl = s('珍', 'zhen1', 'ㄓㄣ');
    const cards = makeDrill(
      [{ target: pearl, slip: 'initial' }],
      [pearl, s('豬', 'zhu1', 'ㄓㄨ'), s('真', 'zhen1', 'ㄓㄣ'), s('租', 'zu1', 'ㄗㄨ')],
    );
    expect(
      cards
        .slice(1)
        .map(c => c.target.h)
        .toSorted(),
    ).toEqual(['真', '豬']);
    expect(cards[1].reason).toBe('同一條規則：聲母 ㄓ 寫 zh');
  });
});

describe('advance', () => {
  it('drops a card once it is typed right enough times in a row', () => {
    let q = [card('甲', 2), card('乙'), card('丙')];
    q = advance(q, true);
    expect(q.map(c => c.target.h)).toEqual(['乙', '丙', '甲']);
    q = advance(advance(q, true), true);
    expect(q.map(c => c.target.h)).toEqual(['甲']);
    expect(advance(q, true)).toEqual([]);
  });

  it('brings a missed card back two cards later and asks for two in a row', () => {
    const q = advance([card('甲'), card('乙'), card('丙'), card('丁')], false);
    expect(q.map(c => c.target.h)).toEqual(['乙', '丙', '甲', '丁']);
    expect(q[2]).toMatchObject({ need: 2, streak: 0 });
  });
});
