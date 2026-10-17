import { useRef, useState, type ChangeEvent, type CompositionEvent, type KeyboardEvent } from 'react';

import { cleanInput, hintAt, isComplete, match, rulesOf, slipAt, targetOf, type Hint } from '../lib/answer';
import { pyOf } from '../lib/pinyin';
import type { Slip, Syllables } from '../lib/types';

type Warn = 'ime' | 'symbol';

export interface HintMessage {
  kind: 'bad' | 'reveal';
  body: Hint[];
}

const WARN_TEXT: Record<Warn, Hint> = {
  ime: {
    text: '現在是注音（中文）輸入法，打的字不會被收到。請切換成英文輸入：Mac 按 Caps Lock 或 Shift，Windows 按 Shift。',
  },
  symbol: { text: '這裡只能打英文字母和數字 1–5，其他符號不會被收到。ü 請打 ', key: 'v', after: '。' },
};

interface TypingState {
  target: Syllables;
  value: string;
  slip: Slip | null;
  revealed: boolean;
  solved: boolean;
  warn: Warn | null;
}

const fresh = (target: Syllables): TypingState => ({
  target,
  value: '',
  slip: null,
  revealed: false,
  solved: false,
  warn: null,
});

interface Options {
  /** 要不要打聲調數字 */
  tone: boolean;
  /** 打對時呼叫；slip 是第一次出錯的地方（沒錯過就是 null），typed 是最後打出來的字 */
  onSolved: (slip: Slip | null, typed: string) => void;
  /** 看答案提示裡的單位，例如「題」或「字」 */
  unit: string;
}

/**
 * 打一個字（或一個詞）的拼音：過濾輸入、比對答案、產生錯誤提示。
 * target 換掉時會自動清空，所以呼叫端只要換題就好。
 */
export function useSyllableTyping(target: Syllables, { tone, onSolved, unit }: Options) {
  const [state, setState] = useState(() => fresh(target));
  const [shake, setShake] = useState(0);
  const composing = useRef(false);
  const ref = useRef<HTMLInputElement>(null);

  let s = state;
  if (s.target !== target) {
    s = fresh(target);
    setState(s);
  }

  const m = match(target, tone, s.value);
  const error = m.k < s.value.length;
  const focus = () => ref.current?.focus({ preventScroll: true });

  const warn = (w: Warn) => {
    setState(prev => ({ ...prev, warn: w }));
    setShake(n => n + 1);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (s.solved) return;
    if (composing.current || (e.nativeEvent as InputEvent).isComposing) return warn('ime');
    const c = cleanInput(e.target.value);
    if (!c.ok) return warn(c.reason);
    const v = c.value.slice(0, targetOf(target, tone).length + 3);
    const vm = match(target, tone, v);
    const hasError = vm.k < v.length;
    const slip = s.slip ?? (hasError ? slipAt(vm.segs, vm.k) : null);
    const solved = !hasError && isComplete(target, tone, v);
    setState({ ...s, value: v, slip, solved, warn: null });
    if (solved) onSolved(slip, v);
  };

  const reveal = () => {
    setState(prev => ({ ...prev, slip: prev.slip ?? 'final', revealed: true }));
    focus();
  };

  /** 換聲調設定時清掉已經打的字，但保留「打錯過」的紀錄 */
  const clear = () => setState(prev => ({ ...prev, value: '', warn: null }));

  let hint: HintMessage | null = null;
  if (s.warn) hint = { kind: 'bad', body: [WARN_TEXT[s.warn]] };
  else if (error) hint = { kind: 'bad', body: [hintAt(target, m.k, m.segs), { text: ' 先按退格鍵刪掉打錯的部分。' }] };
  else if (s.revealed && !s.solved)
    hint = {
      kind: 'reveal',
      body: [
        { text: `答案是 ${pyOf(target)}，要打 `, key: targetOf(target, tone), after: '。' },
        { text: ` ${rulesOf(target).join(' ')} 現在照著打一次，這${unit}不計分。` },
      ],
    };

  const inputProps = {
    ref,
    id: 'ime',
    type: 'text',
    value: s.value,
    onChange,
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Process' || e.keyCode === 229) warn('ime');
    },
    onCompositionStart: () => {
      composing.current = true;
      warn('ime');
    },
    onCompositionEnd: (e: CompositionEvent<HTMLInputElement>) => {
      composing.current = false;
      e.currentTarget.value = s.value;
    },
    autoComplete: 'off',
    autoCapitalize: 'off',
    autoCorrect: 'off',
    spellCheck: false,
    'aria-label': '在這裡輸入拼音',
  };

  return {
    value: s.value,
    matched: m.k,
    solved: s.solved,
    hint,
    nextKey: (error || s.revealed) && !s.solved ? (m.tgt[m.k] ?? null) : null,
    shake,
    reveal,
    clear,
    focus,
    inputProps,
  };
}
