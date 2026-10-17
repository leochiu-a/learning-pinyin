import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { cleanInput, hintAt, isComplete, match, needsTone, rulesOf, targetOf, type Hint } from '../lib/answer';
import { COURSE, TONE_IDX } from '../lib/course';
import { pyOf, zyList } from '../lib/pinyin';
import { canSpeak, speak } from '../lib/speech';
import type { Item, Result } from '../lib/types';
import { Keyboard } from './Keyboard';

interface Props {
  li: number;
  items: Item[];
  toneOn: boolean;
  onToneChange: (on: boolean) => void;
  onFinish: (results: Result[], secs: number) => void;
  onQuit: () => void;
}

type Warn = 'ime' | 'symbol';

const WARN_TEXT: Record<Warn, Hint> = {
  ime: { text: '現在是注音（中文）輸入法，打的字不會被收到。請切換成英文輸入：Mac 按 Caps Lock 或 Shift，Windows 按 Shift。' },
  symbol: { text: '這裡只能打英文字母和數字 1–5，其他符號不會被收到。ü 請打 ', key: 'v', after: '。' },
};

const ADVANCE_MS = 750;

export function PracticeView({ li, items, toneOn, onToneChange, onFinish, onQuit }: Props) {
  // 「四聲與輕聲」這一步一定要打聲調；其他步驟由使用者決定
  const forced = li === TONE_IDX;
  const toneAvail = (li >= TONE_IDX || COURSE[li].isMix) && !forced;
  const tone = forced || toneOn;

  const [i, setI] = useState(0);
  const [value, setValue] = useState('');
  const [wrong, setWrong] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [solved, setSolved] = useState(false);
  const [warn, setWarn] = useState<Warn | null>(null);
  const [shake, setShake] = useState(0);
  const results = useRef<Result[]>([]);
  const startedAt = useRef(Date.now());
  const composing = useRef(false);
  const input = useRef<HTMLInputElement>(null);

  const it = items[i];
  const m = match(it, tone, value);
  const error = m.k < value.length;

  useEffect(() => {
    input.current?.focus({ preventScroll: true });
  }, [i]);

  useEffect(() => {
    if (!solved) return;
    const timer = setTimeout(() => {
      if (i + 1 >= items.length) {
        onFinish(results.current, Math.round((Date.now() - startedAt.current) / 1000));
        return;
      }
      setI(i + 1);
      setValue('');
      setWrong(false);
      setRevealed(false);
      setSolved(false);
      setWarn(null);
    }, ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [solved, i, items.length, onFinish]);

  const flagWarn = (w: Warn) => {
    setWarn(w);
    setShake(s => s + 1);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (solved) return;
    if (composing.current || (e.nativeEvent as InputEvent).isComposing) return flagWarn('ime');
    const c = cleanInput(e.target.value);
    if (!c.ok) return flagWarn(c.reason);
    const v = c.value.slice(0, targetOf(it, tone).length + 3);
    setWarn(null);
    setValue(v);
    if (match(it, tone, v).k < v.length) {
      setWrong(true);
    } else if (isComplete(it, tone, v)) {
      results.current.push({ it, ok: !wrong });
      setSolved(true);
    }
  };

  const reveal = () => {
    setWrong(true);
    setRevealed(true);
    input.current?.focus({ preventScroll: true });
  };

  const changeTone = (on: boolean) => {
    onToneChange(on);
    setValue('');
    input.current?.focus({ preventScroll: true });
  };

  let hint: { kind: 'bad' | 'reveal'; body: Hint[] } | null = null;
  if (warn) hint = { kind: 'bad', body: [WARN_TEXT[warn]] };
  else if (error) hint = { kind: 'bad', body: [hintAt(it, m.k, m.segs), { text: ' 先按退格鍵刪掉打錯的部分。' }] };
  else if (revealed && !solved)
    hint = {
      kind: 'reveal',
      body: [
        { text: `答案是 ${pyOf(it)}，要打 `, key: targetOf(it, tone), after: '。' },
        { text: ` ${rulesOf(it).join(' ')} 現在照著打一次，這題不計分。` },
      ],
    };
  const nextKey = (error || revealed) && !solved ? m.tgt[m.k] ?? null : null;

  const ask = !it.h
    ? '這個注音的拼音是？'
    : needsTone(it, tone)
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
        <span>第 {i + 1} / {items.length} 題</span>
        <span className="bar"><i style={{ width: `${(i / items.length) * 100}%` }} /></span>
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
          {it.h && canSpeak && <button className="btn ghost sm" onClick={() => speak(it.h)}>聽讀音</button>}
          <button className="btn ghost sm" onClick={reveal}>不會，看答案</button>
          <button className="btn ghost sm" onClick={onQuit}>結束練習</button>
        </span>
      </div>

      <div className="stage" onClick={() => input.current?.focus({ preventScroll: true })}>
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
        <div key={shake} className={`typed${solved ? ' win' : ''}${shake ? ' shake' : ''}`}>
          {solved ? (
            value
          ) : value ? (
            <>
              <span className="ok">{value.slice(0, m.k)}</span>
              <span className="bad">{value.slice(m.k)}</span>
              <span className="caret" />
            </>
          ) : (
            <>
              <span className="ph">點這裡開始打字</span>
              <span className="caret" />
            </>
          )}
        </div>
        <div className="answer">{solved ? pyOf(it) : ''}</div>
        <input
          ref={input}
          id="ime"
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={e => { if (e.key === 'Process' || e.keyCode === 229) flagWarn('ime'); }}
          onCompositionStart={() => { composing.current = true; flagWarn('ime'); }}
          onCompositionEnd={e => { composing.current = false; e.currentTarget.value = value; }}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="在這裡輸入拼音"
        />
      </div>

      {hint && (
        <div className={`hint${hint.kind === 'reveal' ? ' reveal' : ''}`}>
          {hint.body.map((h, j) => (
            <span key={j}>
              {h.text}
              {h.key && <kbd>{h.key}</kbd>}
              {h.after}
            </span>
          ))}
        </div>
      )}

      <Keyboard next={nextKey} />
    </>
  );
}
