import { useState } from 'react';
import { Link } from 'react-router';

import { SingleLayout } from '../components/Layouts';
import { ARTICLE_LIST, type BuiltArticle } from '../lib/article';
import { dailyPicks, isNew } from '../lib/daily';
import type { ArticleRecord } from '../lib/types';

// 新加入的排前面
const NEWEST_FIRST = ARTICLE_LIST.toSorted((a, b) => b.added.localeCompare(a.added));

export function ArticlesPage({ records }: { records: Record<string, ArticleRecord> }) {
  const [today] = useState(() => new Date());
  const picks = dailyPicks(ARTICLE_LIST, today);

  const card = (a: BuiltArticle) => {
    const rec = records[a.id];
    return (
      <li key={a.id}>
        <Link className="acard" to={`/articles/${a.id}`}>
          <span className="acard-head">
            <span className="acard-title">{a.title}</span>
            {isNew(a.added, today) && <span className="pill new">新</span>}
          </span>
          <span className="acard-tags">
            <span className="pill level">{a.topic}</span>
            <span className="pill level">{a.level}</span>
          </span>
          <span className="acard-text">{a.text}</span>
          <span className="acard-meta">
            {a.slots.length} 字{rec ? ` · 最佳 ${rec.cpm} 字/分 · 正確 ${Math.round(rec.acc * 100)}%` : ' · 還沒打過'}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <SingleLayout>
      <p className="eyebrow">把學會的拼音用在整段文字上</p>
      <h2>打文章</h2>
      <p className="lede">
        一個字一個字打出拼音，打對就自動跳到下一個字，標點會自動略過。打完會算出每分鐘打幾個字，以及第一次就打對的比例。
      </p>

      <section className="asection">
        <h3>
          今天的短文 <small>{`${today.getMonth() + 1} 月 ${today.getDate()} 日 · 每天換一批`}</small>
        </h3>
        <ul className="alist">{picks.map(card)}</ul>
      </section>

      <section className="asection">
        <h3>
          全部短文 <small>{ARTICLE_LIST.length} 篇 · 新加入的在前面</small>
        </h3>
        <ul className="alist">{NEWEST_FIRST.map(card)}</ul>
      </section>
    </SingleLayout>
  );
}
