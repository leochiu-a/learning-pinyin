import { stripTone } from './pinyin';

const INITIALS: [string, string][] = [
  ['zh', 'ㄓ'],
  ['ch', 'ㄔ'],
  ['sh', 'ㄕ'],
  ['b', 'ㄅ'],
  ['p', 'ㄆ'],
  ['m', 'ㄇ'],
  ['f', 'ㄈ'],
  ['d', 'ㄉ'],
  ['t', 'ㄊ'],
  ['n', 'ㄋ'],
  ['l', 'ㄌ'],
  ['g', 'ㄍ'],
  ['k', 'ㄎ'],
  ['h', 'ㄏ'],
  ['j', 'ㄐ'],
  ['q', 'ㄑ'],
  ['x', 'ㄒ'],
  ['r', 'ㄖ'],
  ['z', 'ㄗ'],
  ['c', 'ㄘ'],
  ['s', 'ㄙ'],
];

const RIMES: Record<string, string> = {
  a: 'ㄚ',
  o: 'ㄛ',
  e: 'ㄜ',
  ai: 'ㄞ',
  ei: 'ㄟ',
  ao: 'ㄠ',
  ou: 'ㄡ',
  an: 'ㄢ',
  en: 'ㄣ',
  ang: 'ㄤ',
  eng: 'ㄥ',
  er: 'ㄦ',
};
const MEDIALS: Record<string, string> = { i: 'ㄧ', u: 'ㄨ', v: 'ㄩ' };

/** 把拼音韻母還原成完整寫法：y/w 開頭、iu ui un 縮寫、ㄐㄑㄒ 後的 u */
function fullFinal(initial: string, f: string) {
  if (!initial) {
    if (f.startsWith('yu')) f = 'v' + f.slice(2);
    else if (f.startsWith('yi')) f = 'i' + f.slice(2);
    else if (f.startsWith('y')) f = 'i' + f.slice(1);
    else if (f.startsWith('wu')) f = 'u' + f.slice(2);
    else if (f.startsWith('w')) f = 'u' + f.slice(1);
  }
  if (initial && 'jqx'.includes(initial) && f.startsWith('u')) f = 'v' + f.slice(1);
  if (f === 'iu') return 'iou';
  if (f === 'ui') return 'uei';
  if (f === 'un') return 'uen';
  return f;
}

function finalZhuyin(f: string) {
  if (f === 'iong') return 'ㄩㄥ';
  if (f === 'ong') return 'ㄨㄥ';
  const medial = MEDIALS[f[0]];
  if (!medial) return RIMES[f];
  const rest = f.slice(1);
  if (!rest) return medial;
  if (rest === 'e') return medial + 'ㄝ';
  if (rest === 'n') return medial + 'ㄣ';
  if (rest === 'ng') return medial + 'ㄥ';
  return medial + RIMES[rest];
}

/**
 * 數字標調拼音轉注音（不含聲調符號）：xue2 → ㄒㄩㄝ、zhi1 → ㄓ。
 * 認不得的拼音回傳 null。
 */
export function toZhuyin(syllable: string): string | null {
  const p = stripTone(syllable);
  const hit = INITIALS.find(([py]) => p.startsWith(py));
  const initial = hit?.[0] ?? '';
  const f = p.slice(initial.length);
  // ㄓㄔㄕㄖㄗㄘㄙ 單獨成音時，拼音的 i 不寫成注音
  if (f === 'i' && /^(zh|ch|sh|r|z|c|s)$/.test(initial)) return hit![1];
  const fz = finalZhuyin(fullFinal(initial, f));
  if (fz === undefined || fz.includes('undefined')) return null;
  return (hit?.[1] ?? '') + fz;
}
