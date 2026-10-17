import { Link } from 'react-router';

import { SingleLayout } from '../components/Layouts';
import { ARTICLE_LIST } from '../lib/article';
import type { ArticleRecord } from '../lib/types';

export function ArticlesPage({ records }: { records: Record<string, ArticleRecord> }) {
  return (
    <SingleLayout>
      <p className="eyebrow">把學會的拼音用在整段文字上</p>
      <h2>打文章</h2>
      <p className="lede">
        一個字一個字打出拼音，打對就自動跳到下一個字，標點會自動略過。打完會算出每分鐘打幾個字，以及第一次就打對的比例。
      </p>
      <ul className="alist">
        {ARTICLE_LIST.map(a => {
          const rec = records[a.id];
          return (
            <li key={a.id}>
              <Link className="acard" to={`/articles/${a.id}`}>
                <span className="acard-head">
                  <span className="acard-title">{a.title}</span>
                  <span className="pill level">{a.level}</span>
                </span>
                <span className="acard-text">{a.text}</span>
                <span className="acard-meta">
                  {a.slots.length} 字
                  {rec ? ` · 最佳 ${rec.cpm} 字/分 · 正確 ${Math.round(rec.acc * 100)}%` : ' · 還沒打過'}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </SingleLayout>
  );
}
