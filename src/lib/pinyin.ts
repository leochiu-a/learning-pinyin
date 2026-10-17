import type { Item } from './types';

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
export const pyOf = (it: Item) => it.syl.map((s, i) => (i > 0 && /^[aoe]/.test(s) ? "'" : '') + mark(s)).join('');

const zyTone = (z: string, t: number) => (t === 5 ? '˙' + z : z + (['', '', 'ˊ', 'ˇ', 'ˋ'][t] ?? ''));

/** 每個音節加上聲調符號的注音 */
export const zyList = (it: Item) => it.zs.map((z, i) => zyTone(z, toneOf(it.syl[i] ?? '')));

/** 這個音節從注音轉拼音時最該注意的規則 */
export function ruleFor(z: string, p: string) {
  if (/^(zh|ch|sh|r|z|c|s)i$/.test(p) && z.length === 1)
    return `${z} 單獨出現時要補上 i，寫成 ${p}（這個 i 不唸 ㄧ）。`;
  if (p === 'yi' || p === 'wu' || p === 'yu') return `單獨的 ${z} 要寫成 ${p}。`;
  if (p === 'v') return 'ㄩ 在鍵盤上用 v 代替。';
  if (/^[jqx]u/.test(p)) return `ㄐㄑㄒ 後面的 ㄩ 省略兩點寫成 u：${z} → ${p}。`;
  if (p.includes('v')) return `ㄋㄩ、ㄌㄩ 的 ü 要保留，鍵盤上用 v 代替：${z} → ${p}。`;
  if (p === 'yong') return 'ㄩㄥ 沒有聲母時寫成 yong。';
  if (p.startsWith('yu')) return `ㄩ 開頭又沒有聲母，寫成 yu：${z} → ${p}。`;
  if (p.startsWith('y')) return `ㄧ 開頭又沒有聲母，i 改寫成 y：${z} → ${p}。`;
  if (p.startsWith('w')) return `ㄨ 開頭又沒有聲母，u 改寫成 w：${z} → ${p}。`;
  if (p.endsWith('iu')) return `ㄧㄡ 接在聲母後面縮寫成 iu：${z} → ${p}。`;
  if (p.endsWith('ui')) return `ㄨㄟ 接在聲母後面縮寫成 ui：${z} → ${p}。`;
  if (p.endsWith('un')) return `ㄨㄣ 接在聲母後面縮寫成 un：${z} → ${p}。`;
  if (p.endsWith('iong')) return `ㄩㄥ 拼成 iong：${z} → ${p}。`;
  if (p.endsWith('ong')) return `ㄨㄥ 拼成 ong：${z} → ${p}。`;
  if (p.endsWith('in')) return `ㄧㄣ 拼成 in，不是 ien：${z} → ${p}。`;
  if (p.endsWith('ing')) return `ㄧㄥ 拼成 ing，不是 ieng：${z} → ${p}。`;
  return `${z} → ${p}。`;
}
