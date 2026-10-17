import { useCallback, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import { CourseLayout } from '../components/Layouts';
import { LearnView } from '../components/LearnView';
import { LessonHead } from '../components/LessonHead';
import { PracticeView } from '../components/PracticeView';
import { ResultView } from '../components/ResultView';
import { COURSE, PASS, drawItems, firstOpenLesson, isDone, isUnlocked, poolFor, quizSize } from '../lib/course';
import type { Item, Progress, Result } from '../lib/types';

type Mode =
  | { kind: 'learn' }
  | { kind: 'practice'; items: Item[]; run: number }
  | { kind: 'result'; results: Result[]; secs: number; next: number | null };

interface Props {
  progress: Progress;
  setProgress: (p: Progress | ((prev: Progress) => Progress)) => void;
  toneOn: boolean;
  setToneOn: (on: boolean) => void;
}

export const lessonPath = (li: number) => `/lessons/${COURSE[li].id}`;

/** /lessons/:lessonId；找不到或還沒解鎖的步驟導回目前該走的那一步 */
export function LessonRoute(props: Props) {
  const { lessonId } = useParams();
  const li = COURSE.findIndex(l => l.id === lessonId);
  if (li < 0 || !isUnlocked(props.progress, li))
    return <Navigate to={lessonPath(firstOpenLesson(props.progress))} replace />;
  return <LessonPage key={lessonId} li={li} {...props} />;
}

function LessonPage({ li, progress, setProgress, toneOn, setToneOn }: Props & { li: number }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>({ kind: 'learn' });

  const goLesson = (i: number) => {
    navigate(lessonPath(i));
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

  return (
    <CourseLayout
      progress={progress}
      current={li}
      practicing={mode.kind === 'practice'}
      onSelect={goLesson}
      onUnlockAll={() => setProgress(p => ({ ...p, all: true }))}
    >
      <LessonHead
        li={li}
        learning={mode.kind === 'learn'}
        onLearn={() => setMode({ kind: 'learn' })}
        onPractice={startPractice}
      />
      {mode.kind === 'learn' && <LearnView li={li} poolSize={poolFor(progress, li).length} onStart={startPractice} />}
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
    </CourseLayout>
  );
}
