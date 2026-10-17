import { useEffect, useRef, useState, type ChangeEvent } from 'react';

import { useSyllableTyping } from '../hooks/useSyllableTyping';
import { charsPerMinute, type BuiltArticle } from '../lib/article';
import { zyList } from '../lib/pinyin';
import { canSpeak, speak } from '../lib/speech';
import { HintBox } from './HintBox';
import { Keyboard } from './Keyboard';

export interface ArticleRun {
  /** 每個要打的字是否第一次就打對，順序同 article.slots */
  firstTry: boolean[];
  ms: number;
}

interface Props {
  article: BuiltArticle;
  toneOn: boolean;
  onToneChange: (on: boolean) => void;
  showZhuyin: boolean;
  onZhuyinChange: (on: boolean) => void;
  onFinish: (run: ArticleRun) => void;
  onQuit: () => void;
}

export function ArticleTyping({ article, toneOn, onToneChange, showZhuyin, onZhuyinChange, onFinish, onQuit }: Props) {
  const [pos, setPos] = useState(0);
  const [firstTry, setFirstTry] = useState<boolean[]>([]);
  // 每個打完的字實際打出來的拼音，留在字的下方
  const [typed, setTyped] = useState<string[]>([]);
  // 從第一次按鍵開始計時，到最近一次打對為止
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [lastAt, setLastAt] = useState<number | null>(null);
  const current = useRef<HTMLSpanElement>(null);

  const slot = article.slots[pos];
  const target = article.chars[slot].target!;
  const typing = useSyllableTyping(target, {
    tone: toneOn,
    unit: '字',
    onSolved: (ok, value) => {
      const now = Date.now();
      const marks = [...firstTry, ok];
      setFirstTry(marks);
      setTyped(t => [...t, value]);
      setLastAt(now);
      if (pos + 1 >= article.slots.length) onFinish({ firstTry: marks, ms: now - (startedAt ?? now) });
      else setPos(pos + 1);
    },
  });
  const { focus } = typing;

  useEffect(() => {
    focus();
    // oxlint-disable-next-line react/exhaustive-deps -- 只在掛載時聚焦
  }, []);

  useEffect(() => {
    current.current?.scrollIntoView({ block: 'nearest' });
  }, [pos]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (startedAt == null) setStartedAt(Date.now());
    typing.inputProps.onChange(e);
  };

  const changeTone = (on: boolean) => {
    onToneChange(on);
    typing.clear();
    focus();
  };

  const done = firstTry.length;
  const ok = firstTry.filter(Boolean).length;
  const cpm = startedAt != null && lastAt != null ? charsPerMinute(done, lastAt - startedAt) : null;
  const slotIndex = new Map(article.slots.map((s, i) => [s, i]));

  return (
    <>
      <div className="pbar">
        <span>
          第 {pos + 1} / {article.slots.length} 字
        </span>
        <span className="bar">
          <i style={{ width: `${(pos / article.slots.length) * 100}%` }} />
        </span>
        <span className="stat">
          <b>{cpm ?? '–'}</b> 字/分
        </span>
        <span className="stat">
          正確 <b>{done ? Math.round((ok / done) * 100) : '–'}</b>%
        </span>
        <label className="toggle" title="真正的拼音輸入法不用打聲調；想加強聲調記憶再打開">
          <input type="checkbox" id="toneOn" checked={toneOn} onChange={e => changeTone(e.target.checked)} /> 打聲調
        </label>
        <label className="toggle" title="關掉注音，練習只看漢字想出拼音">
          <input
            type="checkbox"
            id="showZhuyin"
            checked={showZhuyin}
            onChange={e => {
              onZhuyinChange(e.target.checked);
              focus();
            }}
          />{' '}
          顯示注音
        </label>
        <span className="tools">
          {canSpeak && (
            <button className="btn ghost sm" onClick={() => speak(article.text)}>
              朗讀全文
            </button>
          )}
          <button className="btn ghost sm" onClick={typing.reveal}>
            不會，看答案
          </button>
          <button className="btn ghost sm" onClick={onQuit}>
            回文章列表
          </button>
        </span>
      </div>

      {/* 透明的輸入框蓋滿整個 stage，點哪裡都會聚焦到它 */}
      <div className="stage article-stage">
        <p className="passage" aria-label={article.text}>
          {article.groups.map(group => (
            <span className="pgroup" key={group[0]}>
              {group.map(i => {
                const c = article.chars[i];
                const n = slotIndex.get(i);
                const state = !c.target ? 'punct' : n === pos ? 'cur' : n! < pos ? (firstTry[n!] ? 'ok' : 'miss') : '';
                return (
                  <span key={i} ref={n === pos ? current : undefined} className={`pc ${state}`}>
                    <span className="zy">{showZhuyin && c.target ? zyList(c.target)[0] : ''}</span>
                    <span className="han">{c.ch}</span>
                    {n === pos ? (
                      <span key={typing.shake} className={`pyt${typing.shake ? ' shake' : ''}`}>
                        <span className="ok">{typing.value.slice(0, typing.matched)}</span>
                        <span className="bad">{typing.value.slice(typing.matched)}</span>
                        <span className="caret" />
                      </span>
                    ) : (
                      <span className="pyt">{n != null && n < pos ? typed[n] : ''}</span>
                    )}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
        <p className="ask">直接打拼音，打對會自動跳到下一個字</p>
        <input {...typing.inputProps} onChange={onChange} />
      </div>

      <HintBox hint={typing.hint} />
      <Keyboard next={typing.nextKey} />
    </>
  );
}
