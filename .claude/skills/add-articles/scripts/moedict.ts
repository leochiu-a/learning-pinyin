// 查萌典（教育部國語辭典）的台灣讀音，轉成這個專案的數字標調寫法。
// 用法：node .claude/skills/add-articles/scripts/moedict.ts 東西 謝謝 星期 …
// 每個讀音印一行：詞、數字標調拼音、第一個解釋，用來判斷文章裡該用哪個讀音。

const MARKS: Record<string, [string, number]> = {};
for (const [base, marked] of Object.entries({ a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', v: 'ǖǘǚǜ' }))
  [...marked].forEach((m, i) => (MARKS[m] = [base, i + 1]));

/** dōng xi → dong1 xi5 */
function toNumbered(pinyin: string) {
  return pinyin
    .replace(/（.*?）|\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .map(syl => {
      let tone = 5;
      const plain = [...syl.normalize('NFC')]
        .map(c => {
          const hit = MARKS[c];
          if (!hit) return c === 'ü' ? 'v' : c;
          tone = hit[1];
          return hit[0];
        })
        .join('')
        .toLowerCase();
      return plain + tone;
    })
    .join(' ');
}

const strip = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

for (const word of process.argv.slice(2)) {
  const res = await fetch(`https://www.moedict.tw/uni/${encodeURIComponent(word)}`);
  if (!res.ok) {
    console.log(`${word}\t（萌典查不到，改查單字或換個說法）`);
    continue;
  }
  const data = (await res.json()) as {
    heteronyms?: { pinyin?: string; definitions?: { def?: string }[] }[];
  };
  for (const h of data.heteronyms ?? []) {
    const def = strip(h.definitions?.[0]?.def ?? '').slice(0, 30);
    console.log(`${word}\t${toNumbered(h.pinyin ?? '')}\t${def}`);
  }
}
