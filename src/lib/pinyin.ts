import type { Syllables } from './types';

const MARKS: Record<string, string> = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ' };

export const toneOf = (s: string) => {
  const m = s.match(/([1-5])$/);
  return m ? +m[1] : 0;
};

export const stripTone = (s: string) => s.replace(/[1-5]$/, '');

/** 數字標調轉成符號標調：lv4 → lǜ */
export function mark(s: string) {
  const t = toneOf(s);
  const w = stripTone(s).replace(/v/g, 'ü');
  if (!t || t === 5) return w;
  let i = w.indexOf('a');
  if (i < 0) i = w.indexOf('e');
  if (i < 0 && w.includes('ou')) i = w.indexOf('o');
  if (i < 0) {
    for (let k = w.length - 1; k >= 0; k--) {
      if ('aeiouü'.includes(w[k])) {
        i = k;
        break;
      }
    }
  }
  return i < 0 ? w : w.slice(0, i) + MARKS[w[i]][t - 1] + w.slice(i + 1);
}

/** 整個詞的標準拼音，a o e 開頭的音節前加隔音符號 */
export const pyOf = (it: Syllables) => it.syl.map((s, i) => (i > 0 && /^[aoe]/.test(s) ? "'" : '') + mark(s)).join('');

const zyTone = (z: string, t: number) => (t === 5 ? '˙' + z : z + (['', '', 'ˊ', 'ˇ', 'ˋ'][t] ?? ''));

/** 每個音節加上聲調符號的注音 */
export const zyList = (it: Syllables) => it.zs.map((z, i) => zyTone(z, toneOf(it.syl[i] ?? '')));

export interface Rule {
  /** 同一條規則的字共用同一個 id，練習時拿來找類似的字 */
  id: string;
  /** 規則的簡短名稱 */
  label: string;
  /** 套在這個音節上的說明 */
  text: string;
}

interface RuleDef {
  id: string;
  label: string;
  test: (z: string, p: string) => boolean;
  text: (z: string, p: string) => string;
}

const RULES: RuleDef[] = [
  {
    id: 'bare-i',
    label: 'ㄓㄔㄕㄖㄗㄘㄙ 單獨出現要補 i',
    test: (z, p) => /^(zh|ch|sh|r|z|c|s)i$/.test(p) && z.length === 1,
    text: (z, p) => `${z} 單獨出現時要補上 i，寫成 ${p}（這個 i 不唸 ㄧ）。`,
  },
  {
    id: 'solo',
    label: '單獨的 ㄧㄨㄩ 寫成 yi wu yu',
    test: (_, p) => p === 'yi' || p === 'wu' || p === 'yu',
    text: (z, p) => `單獨的 ${z} 要寫成 ${p}。`,
  },
  { id: 'v-key', label: 'ㄩ 打 v', test: (_, p) => p === 'v', text: () => 'ㄩ 在鍵盤上用 v 代替。' },
  {
    id: 'jqx-u',
    label: 'ㄐㄑㄒ 後的 ㄩ 寫 u',
    test: (_, p) => /^[jqx]u/.test(p),
    text: (z, p) => `ㄐㄑㄒ 後面的 ㄩ 省略兩點寫成 u：${z} → ${p}。`,
  },
  {
    id: 'keep-v',
    label: 'ㄋㄩ ㄌㄩ 保留 ü，打 v',
    test: (_, p) => p.includes('v'),
    text: (z, p) => `ㄋㄩ、ㄌㄩ 的 ü 要保留，鍵盤上用 v 代替：${z} → ${p}。`,
  },
  {
    id: 'yong',
    label: 'ㄩㄥ 寫 iong / yong',
    test: (_, p) => p === 'yong' || p.endsWith('iong'),
    text: (z, p) => (p === 'yong' ? 'ㄩㄥ 沒有聲母時寫成 yong。' : `ㄩㄥ 拼成 iong：${z} → ${p}。`),
  },
  {
    id: 'yu',
    label: '沒有聲母的 ㄩ 寫 yu',
    test: (_, p) => p.startsWith('yu'),
    text: (z, p) => `ㄩ 開頭又沒有聲母，寫成 yu：${z} → ${p}。`,
  },
  {
    id: 'y',
    label: '沒有聲母的 ㄧ 寫 y',
    test: (_, p) => p.startsWith('y'),
    text: (z, p) => `ㄧ 開頭又沒有聲母，i 改寫成 y：${z} → ${p}。`,
  },
  {
    id: 'w',
    label: '沒有聲母的 ㄨ 寫 w',
    test: (_, p) => p.startsWith('w'),
    text: (z, p) => `ㄨ 開頭又沒有聲母，u 改寫成 w：${z} → ${p}。`,
  },
  {
    id: 'iu',
    label: 'ㄧㄡ 有聲母時寫 iu',
    test: (_, p) => p.endsWith('iu'),
    text: (z, p) => `ㄧㄡ 接在聲母後面縮寫成 iu：${z} → ${p}。`,
  },
  {
    id: 'ui',
    label: 'ㄨㄟ 有聲母時寫 ui',
    test: (_, p) => p.endsWith('ui'),
    text: (z, p) => `ㄨㄟ 接在聲母後面縮寫成 ui：${z} → ${p}。`,
  },
  {
    id: 'un',
    label: 'ㄨㄣ 有聲母時寫 un',
    test: (_, p) => p.endsWith('un'),
    text: (z, p) => `ㄨㄣ 接在聲母後面縮寫成 un：${z} → ${p}。`,
  },
  {
    id: 'ong',
    label: 'ㄨㄥ 寫 ong',
    test: (_, p) => p.endsWith('ong'),
    text: (z, p) => `ㄨㄥ 拼成 ong：${z} → ${p}。`,
  },
  {
    id: 'in',
    label: 'ㄧㄣ 寫 in',
    test: (_, p) => p.endsWith('in'),
    text: (z, p) => `ㄧㄣ 拼成 in，不是 ien：${z} → ${p}。`,
  },
  {
    id: 'ing',
    label: 'ㄧㄥ 寫 ing',
    test: (_, p) => p.endsWith('ing'),
    text: (z, p) => `ㄧㄥ 拼成 ing，不是 ieng：${z} → ${p}。`,
  },
];

// ㄅ 到 ㄙ 是聲母
const isInitial = (c: string) => c >= 'ㄅ' && c <= 'ㄙ';

/** 這個音節從注音轉拼音時最該注意的規則；沒有特殊規則時，依韻母歸類 */
export function ruleOf(z: string, p: string): Rule {
  const r = RULES.find(d => d.test(z, p));
  if (r) return { id: r.id, label: r.label, text: r.text(z, p) };
  const final = isInitial(z[0]) && z.length > 1 ? z.slice(1) : z;
  return { id: `final:${final}`, label: `韻母 ${final}`, text: `${z} → ${p}。` };
}

export const ruleFor = (z: string, p: string) => ruleOf(z, p).text;

/** 拆出拼音的聲母（y、w 不算聲母）：zhen → ['zh', 'en'] */
export function splitInitial(p: string): [string, string] {
  const m = p.match(/^(zh|ch|sh|[bpmfdtnlgkhjqxrzcs])?(.*)$/)!;
  return [m[1] ?? '', m[2]];
}
