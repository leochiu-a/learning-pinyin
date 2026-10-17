import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';

import { ArticleTyping, type ArticleRun } from '../components/ArticleTyping';
import { SingleLayout } from '../components/Layouts';
import { ARTICLE_LIST, charsPerMinute, findArticle, type BuiltArticle } from '../lib/article';
import { pyOf, zyList } from '../lib/pinyin';
import type { ArticleRecord } from '../lib/types';

interface Props {
  toneOn: boolean;
  setToneOn: (on: boolean) => void;
  showZhuyin: boolean;
  setShowZhuyin: (on: boolean) => void;
  records: Record<string, ArticleRecord>;
  setRecords: (fn: (prev: Record<string, ArticleRecord>) => Record<string, ArticleRecord>) => void;
}

/** /articles/:articleId；找不到的文章導回列表 */
export function ArticleRoute(props: Props) {
  const article = findArticle(useParams().articleId);
  if (!article) return <Navigate to="/articles" replace />;
  return <ArticlePage key={article.id} article={article} {...props} />;
}

type Mode = { kind: 'typing'; run: number } | { kind: 'result'; run: ArticleRun; record: ArticleRecord; best: boolean };

function ArticlePage({
  article,
  toneOn,
  setToneOn,
  showZhuyin,
  setShowZhuyin,
  records,
  setRecords,
}: Props & { article: BuiltArticle }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>({ kind: 'typing', run: 0 });
  const restart = () => setMode(m => ({ kind: 'typing', run: m.kind === 'typing' ? m.run + 1 : Date.now() }));

  const finish = (run: ArticleRun) => {
    const record = {
      cpm: charsPerMinute(run.firstTry.length, run.ms),
      acc: run.firstTry.filter(Boolean).length / run.firstTry.length,
    };
    const prev = records[article.id];
    const best = !prev || record.cpm > prev.cpm;
    if (best) setRecords(r => ({ ...r, [article.id]: record }));
    setMode({ kind: 'result', run, record, best });
  };

  const idx = ARTICLE_LIST.indexOf(article);
  const next = ARTICLE_LIST[idx + 1];

  return (
    <SingleLayout practicing={mode.kind === 'typing'}>
      <div className="lhead">
        <div>
          <p className="eyebrow">
            <Link to="/articles">打文章</Link> · {article.level} · {article.slots.length} 字
          </p>
          <h2>{article.title}</h2>
        </div>
      </div>
      {mode.kind === 'typing' ? (
        <ArticleTyping
          key={mode.run}
          article={article}
          toneOn={toneOn}
          onToneChange={setToneOn}
          showZhuyin={showZhuyin}
          onZhuyinChange={setShowZhuyin}
          onFinish={finish}
          onQuit={() => navigate('/articles')}
        />
      ) : (
        <ArticleResult
          article={article}
          run={mode.run}
          record={mode.record}
          best={mode.best}
          previous={records[article.id]}
          onRetry={restart}
          onNext={next ? () => navigate(`/articles/${next.id}`) : null}
        />
      )}
    </SingleLayout>
  );
}

interface ResultProps {
  article: BuiltArticle;
  run: ArticleRun;
  record: ArticleRecord;
  best: boolean;
  previous: ArticleRecord | undefined;
  onRetry: () => void;
  onNext: (() => void) | null;
}

function ArticleResult({ article, run, record, best, previous, onRetry, onNext }: ResultProps) {
  const secs = Math.round(run.ms / 1000);
  const time = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  const seen = new Set<string>();
  const misses = article.slots
    .filter((_, i) => !run.firstTry[i])
    .map(s => article.chars[s].target!)
    .filter(t => !seen.has(t.h + t.syl[0]) && seen.add(t.h + t.syl[0]));

  return (
    <>
      <div className="score">
        <div className="big py">
          {record.cpm}
          <small> 字/分</small>
        </div>
        <div>
          {best ? (
            <span className="pill pass">新紀錄</span>
          ) : (
            <span className="pill retry">最佳 {previous?.cpm} 字/分</span>
          )}
          <p className="note" style={{ marginTop: 6 }}>
            第一次就打對 {Math.round(record.acc * 100)}% · 用時 {time}
          </p>
        </div>
      </div>
      {misses.length ? (
        <>
          <h3 className="eyebrow" style={{ marginTop: 24 }}>
            這幾個字再看一眼
          </h3>
          <ul className="misses">
            {misses.map(t => (
              <li key={t.h + t.syl[0]}>
                <span className="han">{t.h}</span>
                <span className="zy">{zyList(t).join(' ')}</span>
                <span className="py">{pyOf(t)}</span>
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
        <button className="btn" onClick={onRetry}>
          再打一次
        </button>
        {onNext && (
          <button className="btn ghost" onClick={onNext}>
            下一篇
          </button>
        )}
        <Link className="btn ghost" to="/articles">
          回文章列表
        </Link>
      </div>
    </>
  );
}
