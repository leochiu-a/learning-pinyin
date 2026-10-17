import { useEffect, useRef, useState } from 'react';

import { useSyllableTyping } from '../hooks/useSyllableTyping';
import { COURSE, TONE_IDX, toneApplies } from '../lib/course';
import { pyOf, zyList } from '../lib/pinyin';
import { canSpeak, speak } from '../lib/speech';
import type { Item, Result } from '../lib/types';
import { HintBox } from './HintBox';
import { Keyboard } from './Keyboard';
import { TypedLine } from './TypedLine';

interface Props {
  li: number;
  items: Item[];
  toneOn: boolean;
  onToneChange: (on: boolean) => void;
  onFinish: (results: Result[], secs: number) => void;
  onQuit: () => void;
}

const ADVANCE_MS = 750;

export function PracticeView({ li, items, toneOn, onToneChange, onFinish, onQuit }: Props) {
  // 「四聲與輕聲」這一步一定要打聲調；其他步驟由使用者決定
  const forced = li === TONE_IDX;
  const toneAvail = (li >= TONE_IDX || COURSE[li].isMix) && !forced;

  const [i, setI] = useState(0);
  const results = useRef<Result[]>([]);
  const [startedAt] = useState(() => Date.now());

  const it = items[i];
  const tone = toneApplies(it, forced || toneOn);
  const typing = useSyllableTyping(it, {
    tone,
    unit: '題',
    onSolved: slip => results.current.push({ it, ok: slip === null }),
  });
  const { solved, focus } = typing;

  // 每輪練習都會重新掛載，輸入框之後一直是同一個元素，所以只要在一開始聚焦
  useEffect(() => {
    focus();
    // oxlint-disable-next-line react/exhaustive-deps -- 只在掛載時聚焦
  }, []);

  useEffect(() => {
    if (!solved) return;
    const timer = setTimeout(() => {
      if (i + 1 >= items.length) onFinish(results.current, Math.round((Date.now() - startedAt) / 1000));
      else setI(i + 1);
    }, ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [solved, i, items.length, onFinish, startedAt]);

  const changeTone = (on: boolean) => {
    onToneChange(on);
    typing.clear();
    focus();
  };

  const ask = !it.h
    ? '這個注音的拼音是？'
    : tone
      ? '打出拼音，每個音節後面加聲調數字（輕聲可以不打）'
      : '打出拼音，不用打聲調';
  const toneTip = forced
    ? '這一步就是練聲調，一定要打'
    : toneAvail
      ? '真正的拼音輸入法不用打聲調；想加強聲調記憶再打開'
      : '第 4 步之後才能練聲調';
  const zy = zyList(it);

  return (
    <>
      <div className="pbar">
        <span>
          第 {i + 1} / {items.length} 題
        </span>
        <span className="bar">
          <i style={{ width: `${(i / items.length) * 100}%` }} />
        </span>
        <label className={`toggle${toneAvail ? '' : ' off'}`} title={toneTip}>
          <input
            type="checkbox"
            id="toneOn"
            checked={forced || (toneOn && toneAvail)}
            disabled={!toneAvail}
            onChange={e => changeTone(e.target.checked)}
          />{' '}
          打聲調 1–5
        </label>
        <span className="tools">
          {it.h && canSpeak && (
            <button className="btn ghost sm" onClick={() => speak(it.h)}>
              聽讀音
            </button>
          )}
          <button className="btn ghost sm" onClick={typing.reveal}>
            不會，看答案
          </button>
          <button className="btn ghost sm" onClick={onQuit}>
            結束練習
          </button>
        </span>
      </div>

      {/* 透明的輸入框蓋滿整個 stage，點哪裡都會聚焦到它 */}
      <div className="stage">
        <div className="prompt">
          {it.h ? (
            [...it.h].map((c, j) => (
              <span className="glyph" key={j}>
                <span className="han">{c}</span>
                <span className="zy">{zy[j] ?? ''}</span>
              </span>
            ))
          ) : (
            <span className="zy solo">{it.zs[0]}</span>
          )}
        </div>
        <p className="ask">{ask}</p>
        <TypedLine value={typing.value} matched={typing.matched} solved={solved} shake={typing.shake} />
        <div className="answer">{solved ? pyOf(it) : ''}</div>
        <input {...typing.inputProps} />
      </div>

      <HintBox hint={typing.hint} />
      <Keyboard next={typing.nextKey} />
    </>
  );
}
