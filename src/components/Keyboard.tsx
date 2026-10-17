import { useEffect, useState } from 'react';

// 每個鍵：英文字母 + 大千注音鍵位
const ROWS = [
  ['1ㄅ', '2ㄉ', '3ˇ', '4ˋ', '5ㄓ', '6ˊ', '7˙', '8ㄚ', '9ㄞ', '0ㄢ'],
  ['qㄆ', 'wㄊ', 'eㄍ', 'rㄐ', 'tㄔ', 'yㄗ', 'uㄧ', 'iㄛ', 'oㄟ', 'pㄣ'],
  ['aㄇ', 'sㄋ', 'dㄎ', 'fㄑ', 'gㄕ', 'hㄘ', 'jㄨ', 'kㄜ', 'lㄠ'],
  ['zㄈ', 'xㄌ', 'cㄏ', 'vㄒ', 'bㄖ', 'nㄙ', 'mㄩ'],
];

export function Keyboard({ next }: { next: string | null }) {
  const [pressed, setPressed] = useState<string | null>(null);

  useEffect(() => {
    let timer = 0;
    const onKey = (e: KeyboardEvent) => {
      setPressed((e.key || '').toLowerCase());
      clearTimeout(timer);
      timer = window.setTimeout(() => setPressed(null), 120);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="kbd" aria-hidden="true">
        {ROWS.map(row => (
          <div className="krow" key={row[0]}>
            {row.map(k => {
              const ch = k[0];
              const cls = ['k', next === ch && 'next', pressed === ch && 'press'].filter(Boolean).join(' ');
              return (
                <span className={cls} key={ch}>
                  <span className="l">{ch}</span>
                  <span className="z">{k.slice(1)}</span>
                  {ch === 'v' && <span className="u">ü</span>}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <p className="kcap">鍵帽上的小字是你熟悉的大千注音鍵位。打錯時，下一個該按的鍵會亮起來。</p>
    </>
  );
}
