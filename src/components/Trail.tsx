import { COURSE, PASS, isDone, isUnlocked } from '../lib/course';
import type { Progress } from '../lib/types';

interface Props {
  progress: Progress;
  current: number | null;
  onSelect: (li: number) => void;
  onUnlockAll: () => void;
}

export function Trail({ progress, current, onSelect, onUnlockAll }: Props) {
  let n = 0;
  return (
    <nav aria-label="課程步道">
      <ol className="trail">
        {COURSE.map((l, i) => {
          const done = isDone(progress, i);
          const label = l.isMix ? '★' : ++n;
          const best = progress.done[l.id];
          return (
            <li key={l.id}>
              <button
                className={['step', done && 'done', current === i && 'on'].filter(Boolean).join(' ')}
                disabled={!isUnlocked(progress, i)}
                aria-current={current === i ? 'step' : undefined}
                onClick={() => onSelect(i)}
              >
                <span className="node">{done && !l.isMix ? '✓' : label}</span>
                <span>
                  <span className="step-t">{l.title}</span>
                  <span className="step-s">
                    {l.sub}
                    {best != null && !l.isMix && ` · 最佳 ${Math.round(best * 100)}%`}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="trail-foot">
        {progress.all ? (
          '已解鎖全部步驟。'
        ) : (
          <>
            每一步答對 {PASS * 100}% 才會開下一步。
            <br />
            <button className="linkbtn" onClick={onUnlockAll}>
              已經會了？直接解鎖全部
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
