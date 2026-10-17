import { COURSE, PASS } from '../lib/course';
import { pyOf, zyList } from '../lib/pinyin';
import type { Result } from '../lib/types';

interface Props {
  results: Result[];
  secs: number;
  next: number | null;
  onNext: (li: number) => void;
  onRetry: () => void;
  onLearn: () => void;
}

export function ResultView({ results, secs, next, onNext, onRetry, onLearn }: Props) {
  const ok = results.filter(r => r.ok).length;
  const acc = ok / results.length;
  const passed = acc >= PASS;
  const misses = [...new Set(results.filter(r => !r.ok).map(r => r.it))];
  const time = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  const showNext = passed && next != null;

  return (
    <>
      <div className="score">
        <div className={`big ${passed ? 'py' : 'zy'}`}>{Math.round(acc * 100)}%</div>
        <div>
          <span className={`pill ${passed ? 'pass' : 'retry'}`}>
            {passed ? '過關' : `還差一點，${PASS * 100}% 過關`}
          </span>
          <p className="note" style={{ marginTop: 6 }}>
            第一次就打對 {ok} / {results.length} 題 · 用時 {time}
          </p>
        </div>
      </div>
      {misses.length ? (
        <>
          <h3 className="eyebrow" style={{ marginTop: 24 }}>
            這幾題再看一眼
          </h3>
          <ul className="misses">
            {misses.map((it, j) => (
              <li key={j}>
                {it.h && <span className="han">{it.h}</span>}
                <span className="zy">{zyList(it).join(' ')}</span>
                <span className="py">{pyOf(it)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="lede" style={{ marginTop: 20 }}>
          全部一次打對。
        </p>
      )}
      <div className="go">
        {showNext && (
          <button className="btn" onClick={() => onNext(next)}>
            下一步：{COURSE[next].title}
          </button>
        )}
        <button className={`btn${showNext ? ' ghost' : ''}`} onClick={onRetry}>
          再練一次
        </button>
        <button className="btn ghost" onClick={onLearn}>
          回到學習
        </button>
      </div>
    </>
  );
}
