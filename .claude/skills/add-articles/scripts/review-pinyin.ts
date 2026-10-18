// 用 pinyin-pro 交叉檢查文章拼音：列出跟函式庫不同的字，交給人判斷是台灣讀音還是打錯。
// 用法（在 repo 根目錄）：node .claude/skills/add-articles/scripts/review-pinyin.ts [文章 id ...]
// 沒給 id 時檢查最近一次加入（added 最新那天）的文章。
import { pinyin } from 'pinyin-pro';

import { ARTICLES } from '../../../../src/data/articles.ts';

const HAN = /\p{Script=Han}/u;
const ids = process.argv.slice(2);
const latest = ARTICLES.map(a => a.added)
  .toSorted()
  .at(-1);
const targets = ids.length ? ARTICLES.filter(a => ids.includes(a.id)) : ARTICLES.filter(a => a.added === latest);

// pinyin-pro 的輕聲是 0、ü 是 ü；換成這個專案的寫法（5、v）
const normalize = (p: string) => p.replace(/ü/g, 'v').replace(/0$/, '5');

let issues = 0;
for (const a of targets) {
  const chars = [...a.text];
  const ours = a.pinyin.trim().split(/\s+/);
  const lib = pinyin(a.text, { toneType: 'num', type: 'array', toneSandhi: false }).map(normalize);
  const problems: string[] = [];

  const han = chars.filter(c => HAN.test(c)).length;
  if (/[A-Za-z0-9０-９]/.test(a.text)) problems.push('內文有英文字母或阿拉伯數字，請改成中文');
  if (a.topic !== '古詩' && (han < 30 || han > 80)) problems.push(`漢字有 ${han} 個，建議 30 到 80 個`);

  let n = 0;
  chars.forEach((c, i) => {
    if (!HAN.test(c)) return;
    const mine = ours[n++];
    if (mine && mine !== lib[i]) {
      const context = chars.slice(Math.max(0, i - 3), i + 4).join('');
      problems.push(`「${c}」 本文 ${mine} ／ pinyin-pro ${lib[i]}　…${context}…`);
    }
  });

  console.log(`\n## ${a.id}　${a.title}（${han} 字）`);
  if (!problems.length) console.log('  ✓ 與 pinyin-pro 一致');
  for (const p of problems) console.log(`  - ${p}`);
  issues += problems.length;
}
console.log(
  `\n共檢查 ${targets.length} 篇，${issues} 個地方要看。差異不一定是錯：台灣讀音、輕聲、破音字都會不同，逐一判斷。`,
);
