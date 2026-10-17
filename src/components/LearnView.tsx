import { COURSE, PASS, quizSize } from '../lib/course';
import { pyOf, zyList } from '../lib/pinyin';
import { SayButton } from './SayButton';

interface Props {
  li: number;
  poolSize: number;
  onStart: () => void;
}

export function LearnView({ li, poolSize, onStart }: Props) {
  const l = COURSE[li];
  return (
    <>
      <p className="lede">{l.intro}</p>
      {l.rows.length > 0 ? (
        <div className="cards">
          {l.rows.map(r => (
            <div className="card" key={r.z}>
              <div className="map">
                <span className="zy">{r.z}</span>
                <span className="arrow">→</span>
                <span className="py">{r.p}</span>
              </div>
              {r.exItem && (
                <div className="ex">
                  <span className="han">{r.exItem.h}</span>
                  <span className="py">{pyOf(r.exItem)}</span>
                  <span className="zy">{zyList(r.exItem).join(' ')}</span>
                  <SayButton text={r.exItem.h} />
                </div>
              )}
              {r.note && <p className="note">{r.note}</p>}
            </div>
          ))}
        </div>
      ) : (
        l.isMix && <p className="note">目前題庫：{poolSize} 題，來自你完成的步驟。</p>
      )}
      {l.traps.length > 0 && (
        <div className="traps">
          <h3>台灣人最容易打錯</h3>
          <ul>{l.traps.map(t => <li key={t}>{t}</li>)}</ul>
        </div>
      )}
      <div className="go">
        <button className="btn" onClick={onStart}>開始打字練習</button>
        <small>{quizSize(li)} 題 · 第一次就打對才算分 · {PASS * 100}% 過關</small>
      </div>
    </>
  );
}
