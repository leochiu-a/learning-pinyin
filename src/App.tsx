import { useCallback, useState } from 'react';

import { LearnView } from './components/LearnView';
import { LessonHead } from './components/LessonHead';
import { PracticeView } from './components/PracticeView';
import { ResultView } from './components/ResultView';
import { TableView } from './components/TableView';
import { Trail } from './components/Trail';
import { COURSE, PASS, drawItems, firstOpenLesson, isDone, isUnlocked, poolFor, quizSize } from './lib/course';
import { useStoredState } from './lib/storage';
import type { Item, Progress, Result } from './lib/types';

type Mode =
  | { kind: 'learn' }
  | { kind: 'practice'; items: Item[]; run: number }
  | { kind: 'result'; results: Result[]; secs: number; next: number | null };

const TOTAL_STEPS = COURSE.filter(l => !l.isMix).length;

export function App() {
  const [progress, setProgress] = useStoredState<Progress>('pinyin-steps', { done: {}, all: false });
  const [toneOn, setToneOn] = useStoredState('pinyin-steps:tone', false);
  const [view, setView] = useState<'lesson' | 'table'>('lesson');
  const [li, setLi] = useState(() => firstOpenLesson(progress));
  const [mode, setMode] = useState<Mode>({ kind: 'learn' });

  const goLesson = (i: number) => {
    setView('lesson');
    setLi(i);
    setMode({ kind: 'learn' });
    window.scrollTo({ top: 0 });
  };

  const startPractice = () =>
    setMode({ kind: 'practice', items: drawItems(poolFor(progress, li), quizSize(li)), run: Date.now() });

  const finish = useCallback(
    (results: Result[], secs: number) => {
      const lesson = COURSE[li];
      const acc = results.filter(r => r.ok).length / results.length;
      let next = progress;
      if (acc >= PASS && !lesson.isMix) {
        next = { ...progress, done: { ...progress.done, [lesson.id]: Math.max(progress.done[lesson.id] ?? 0, acc) } };
        setProgress(next);
      }
      const nextLesson = lesson.isMix
        ? -1
        : COURSE.findIndex((_, j) => j > li && isUnlocked(next, j) && !isDone(next, j));
      setMode({ kind: 'result', results, secs, next: nextLesson >= 0 ? nextLesson : null });
    },
    [li, progress, setProgress],
  );

  const done = COURSE.filter((l, i) => !l.isMix && isDone(progress, i)).length;
  const practicing = view === 'lesson' && mode.kind === 'practice';

  return (
    <>
      <header className="top">
        <div className="brand">
          <h1>拼音步道</h1>
          <span>用你會的注音，一步一步學會打拼音</span>
        </div>
        <fieldset className="views" aria-label="切換頁面">
          <button aria-pressed={view === 'lesson'} onClick={() => setView('lesson')}>
            課程
          </button>
          <button aria-pressed={view === 'table'} onClick={() => setView('table')}>
            注音拼音對照表
          </button>
        </fieldset>
        <div className="meter">
          已走 <b>{done}</b> / {TOTAL_STEPS} 步
        </div>
      </header>
      <div className="app">
        <Trail
          progress={progress}
          current={view === 'lesson' ? li : null}
          onSelect={goLesson}
          onUnlockAll={() => setProgress(p => ({ ...p, all: true }))}
        />
        <main className={`panel${practicing ? ' practice' : ''}`}>
          {view === 'table' ? (
            <TableView />
          ) : (
            <>
              <LessonHead
                li={li}
                learning={mode.kind === 'learn'}
                onLearn={() => setMode({ kind: 'learn' })}
                onPractice={startPractice}
              />
              {mode.kind === 'learn' && (
                <LearnView li={li} poolSize={poolFor(progress, li).length} onStart={startPractice} />
              )}
              {mode.kind === 'practice' && (
                <PracticeView
                  key={mode.run}
                  li={li}
                  items={mode.items}
                  toneOn={toneOn}
                  onToneChange={setToneOn}
                  onFinish={finish}
                  onQuit={() => setMode({ kind: 'learn' })}
                />
              )}
              {mode.kind === 'result' && (
                <ResultView
                  results={mode.results}
                  secs={mode.secs}
                  next={mode.next}
                  onNext={goLesson}
                  onRetry={startPractice}
                  onLearn={() => setMode({ kind: 'learn' })}
                />
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
