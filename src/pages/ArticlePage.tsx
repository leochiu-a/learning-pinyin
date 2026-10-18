import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';

import { ArticleTyping, type ArticleRun } from '../components/ArticleTyping';
import { DrillView, type DrillSummary } from '../components/DrillView';
import { SingleLayout } from '../components/Layouts';
import { ARTICLE_LIST, charsPerMinute, findArticle, type BuiltArticle } from '../lib/article';
import { makeDrill, slipRule, type Card, type Miss } from '../lib/drill';
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

type Mode =
  | { kind: 'typing'; run: number }
  | { kind: 'result'; run: ArticleRun; record: ArticleRecord; best: boolean }
  | { kind: 'drill'; cards: Card[] }
  | { kind: 'drilled'; summary: DrillSummary };

/** 這次打錯的字（同一個字只算一次），附上第一次錯在哪裡 */
function missesOf(article: BuiltArticle, run: ArticleRun): Miss[] {
  const seen = new Set<string>();
  return article.slots.flatMap((s, i) => {
    const slip = run.slips[i];
    const target = article.chars[s].target!;
    const key = target.h + target.syl[0];
    if (!slip || seen.has(key)) return [];
    seen.add(key);
    return [{ target, slip }];
  });
}

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
      cpm: charsPerMinute(run.slips.length, run.ms),
      acc: run.slips.filter(x => x === null).length / run.slips.length,
    };
    const prev = records[article.id];
    const best = !prev || record.cpm > prev.cpm;
    if (best) setRecords(r => ({ ...r, [article.id]: record }));
    setMode({ kind: 'result', run, record, best });
  };

  const next = ARTICLE_LIST[ARTICLE_LIST.indexOf(article) + 1];
  const onNext = next ? () => navigate(`/articles/${next.id}`) : null;

  return (
    <SingleLayout practicing={mode.kind === 'typing' || mode.kind === 'drill'}>
      <div className="lhead">
        <div>
          <p className="eyebrow">
            <Link to="/articles">打文章</Link> · {article.topic} · {article.level} · {article.slots.length} 字
            {article.source && (
              <>
                {' · 參考 '}
                <a href={article.source.url} target="_blank" rel="noreferrer">
                  {article.source.name}
                </a>
              </>
            )}
          </p>
          <h2>{article.title}</h2>
        </div>
      </div>
      {mode.kind === 'typing' && (
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
      )}
      {mode.kind === 'result' && (
        <ArticleResult
          misses={missesOf(article, mode.run)}
          run={mode.run}
          record={mode.record}
          best={mode.best}
          previous={records[article.id]}
          onDrill={misses => setMode({ kind: 'drill', cards: makeDrill(misses) })}
          onRetry={restart}
          onNext={onNext}
        />
      )}
      {mode.kind === 'drill' && (
        <DrillView
          cards={mode.cards}
          tone={toneOn}
          onDone={summary => setMode({ kind: 'drilled', summary })}
          onQuit={restart}
        />
      )}
      {mode.kind === 'drilled' && <DrillDone summary={mode.summary} onRetry={restart} onNext={onNext} />}
    </SingleLayout>
  );
}

interface ResultProps {
  misses: Miss[];
  run: ArticleRun;
  record: ArticleRecord;
  best: boolean;
  previous: ArticleRecord | undefined;
  onDrill: (misses: Miss[]) => void;
  onRetry: () => void;
  onNext: (() => void) | null;
}

const slipLabel = ({ target, slip }: Miss) =>
  slip === 'tone' ? `錯在聲調：${slipRule(target, slip).label}` : slipRule(target, slip).label;

function ArticleResult({ misses, run, record, best, previous, onDrill, onRetry, onNext }: ResultProps) {
  const secs = Math.round(run.ms / 1000);
  const time = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

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
            這幾個字打錯了
          </h3>
          <ul className="misses">
            {misses.map(m => (
              <li key={m.target.h + m.target.syl[0]}>
                <span className="han">{m.target.h}</span>
                <span className="zy">{zyList(m.target).join(' ')}</span>
                <span className="py">{pyOf(m.target)}</span>
                <span className="miss-rule">{slipLabel(m)}</span>
              </li>
            ))}
          </ul>
          <p className="note" style={{ marginTop: 12 }}>
            針對練習會先考打錯的字，再加上用同一條規則（錯在聲調就是同聲調）的其他字。錯字要連續打對兩次才算過。
          </p>
        </>
      ) : (
        <p className="lede" style={{ marginTop: 20 }}>
          全部一次打對。
        </p>
      )}
      <div className="go">
        {misses.length > 0 && (
          <button className="btn" onClick={() => onDrill(misses)}>
            針對錯字練習
          </button>
        )}
        <button className={`btn${misses.length ? ' ghost' : ''}`} onClick={onRetry}>
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

function DrillDone({
  summary,
  onRetry,
  onNext,
}: {
  summary: DrillSummary;
  onRetry: () => void;
  onNext: (() => void) | null;
}) {
  return (
    <>
      <div className="score">
        <div className="big py">
          {summary.cards}
          <small> 個字</small>
        </div>
        <div>
          <span className="pill pass">針對練習完成</span>
          <p className="note" style={{ marginTop: 6 }}>
            {summary.retried ? `其中 ${summary.retried} 個字中途打錯，重考後才過。` : '每個字都一次就打對。'}
          </p>
        </div>
      </div>
      <p className="lede" style={{ marginTop: 20 }}>
        趁記憶還新，再把整篇打一次，看看剛剛錯的字這次能不能一次打對。
      </p>
      <div className="go">
        <button className="btn" onClick={onRetry}>
          再打一次文章
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
