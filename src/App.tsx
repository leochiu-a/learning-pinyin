import { NavLink, Navigate, Route, Routes } from 'react-router';

import { SingleLayout } from './components/Layouts';
import { TableView } from './components/TableView';
import { COURSE, firstOpenLesson, isDone } from './lib/course';
import { useStoredState } from './lib/storage';
import type { ArticleRecord, Progress } from './lib/types';
import { ArticleRoute } from './pages/ArticlePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { LessonRoute, lessonPath } from './pages/LessonPage';

const TOTAL_STEPS = COURSE.filter(l => !l.isMix).length;

export function App() {
  const [progress, setProgress] = useStoredState<Progress>('pinyin-steps', { done: {}, all: false });
  const [toneOn, setToneOn] = useStoredState('pinyin-steps:tone', false);
  const [showZhuyin, setShowZhuyin] = useStoredState('pinyin-steps:zhuyin', true);
  const [records, setRecords] = useStoredState<Record<string, ArticleRecord>>('pinyin-steps:articles', {});

  const done = COURSE.filter((l, i) => !l.isMix && isDone(progress, i)).length;
  const lessonProps = { progress, setProgress, toneOn, setToneOn };

  return (
    <>
      <header className="top">
        <div className="brand">
          <h1>拼音步道</h1>
          <span>用你會的注音，一步一步學會打拼音</span>
        </div>
        <nav className="views" aria-label="主選單">
          <NavLink to="/lessons">課程</NavLink>
          <NavLink to="/articles">打文章</NavLink>
          <NavLink to="/table">對照表</NavLink>
        </nav>
        <div className="meter">
          已走 <b>{done}</b> / {TOTAL_STEPS} 步
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/lessons" replace />} />
        <Route path="/lessons" element={<Navigate to={lessonPath(firstOpenLesson(progress))} replace />} />
        <Route path="/lessons/:lessonId" element={<LessonRoute {...lessonProps} />} />
        <Route path="/articles" element={<ArticlesPage records={records} />} />
        <Route
          path="/articles/:articleId"
          element={
            <ArticleRoute
              toneOn={toneOn}
              setToneOn={setToneOn}
              showZhuyin={showZhuyin}
              setShowZhuyin={setShowZhuyin}
              records={records}
              setRecords={setRecords}
            />
          }
        />
        <Route
          path="/table"
          element={
            <SingleLayout>
              <TableView />
            </SingleLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
