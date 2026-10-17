import { useEffect, useState } from 'react';

import { useSyllableTyping } from '../hooks/useSyllableTyping';
import { advance, type Card } from '../lib/drill';
import { pyOf, zyList } from '../lib/pinyin';
import { canSpeak, speak } from '../lib/speech';
import { HintBox } from './HintBox';
import { Keyboard } from './Keyboard';
import { TypedLine } from './TypedLine';

export interface DrillSummary {
  cards: number;
  /** 有幾張卡中途打錯、被插回去重考 */
  retried: number;
}

interface Props {
  cards: Card[];
  tone: boolean;
  onDone: (summary: DrillSummary) => void;
  onQuit: () => void;
}

const ADVANCE_MS = 600;

/** 針對練習：錯字連續打對兩次、類似的字打對一次，打錯的卡會在兩張之後再出現 */
export function DrillView({ cards, tone, onDone, onQuit }: Props) {
  const [queue, setQueue] = useState(cards);
  const [attempt, setAttempt] = useState(0);
  const [retried, setRetried] = useState<Set<Card['target']>>(() => new Set());

  const next = (firstTry: boolean) => {
    const head = queue[0];
    const rest = advance(queue, firstTry);
    const r = firstTry ? retried : new Set(retried).add(head.target);
    setRetried(r);
    if (!rest.length) onDone({ cards: cards.length, retried: r.size });
    else {
      setQueue(rest);
      setAttempt(a => a + 1);
    }
  };

  const cleared = cards.length - new Set(queue.map(c => c.target)).size;

  // 每次作答換一個 key，同一張卡連續出現時輸入框也會清空
  return (
    <DrillCard
      key={attempt}
      card={queue[0]}
      tone={tone}
      cleared={cleared}
      total={cards.length}
      onNext={next}
      onQuit={onQuit}
    />
  );
}

interface CardProps {
  card: Card;
  tone: boolean;
  cleared: number;
  total: number;
  onNext: (firstTry: boolean) => void;
  onQuit: () => void;
}

function DrillCard({ card, tone, cleared, total, onNext, onQuit }: CardProps) {
  const [result, setResult] = useState<boolean | null>(null);
  const t = card.target;
  const typing = useSyllableTyping(t, { tone, unit: '題', onSolved: slip => setResult(slip === null) });
  const { focus } = typing;

  useEffect(() => {
    focus();
    // oxlint-disable-next-line react/exhaustive-deps -- 只在掛載時聚焦
  }, []);

  useEffect(() => {
    if (result === null) return;
    const timer = setTimeout(() => onNext(result), ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [result, onNext]);

  const remaining = card.need - card.streak;

  return (
    <>
      <div className="pbar">
        <span>
          已過 {cleared} / {total} 個字
        </span>
        <span className="bar">
          <i style={{ width: `${(cleared / total) * 100}%` }} />
        </span>
        <span className="tools">
          {canSpeak && (
            <button className="btn ghost sm" onClick={() => speak(t.h)}>
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
        <p className="drill-reason">
          <span className="pill level">{card.reason}</span>
          <span className="note">{remaining > 1 ? `要連續打對 ${remaining} 次` : '打對 1 次就過關'}</span>
        </p>
        <div className="prompt">
          <span className="glyph">
            <span className="han">{t.h}</span>
            <span className="zy">{zyList(t)[0]}</span>
          </span>
        </div>
        <TypedLine value={typing.value} matched={typing.matched} solved={typing.solved} shake={typing.shake} />
        <div className="answer">{typing.solved ? pyOf(t) : ''}</div>
        <input {...typing.inputProps} />
      </div>
      <HintBox hint={typing.hint} />
      <Keyboard next={typing.nextKey} />
    </>
  );
}
