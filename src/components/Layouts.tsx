import type { ReactNode } from 'react';

import type { Progress } from '../lib/types';
import { Trail } from './Trail';

interface CourseProps {
  progress: Progress;
  current: number | null;
  /** 練習中時內容區改成上下撐滿的排版 */
  practicing: boolean;
  onSelect: (li: number) => void;
  onUnlockAll: () => void;
  children: ReactNode;
}

/** 課程頁：左邊步道、右邊內容 */
export function CourseLayout({ progress, current, practicing, onSelect, onUnlockAll, children }: CourseProps) {
  return (
    <div className="app">
      <Trail progress={progress} current={current} onSelect={onSelect} onUnlockAll={onUnlockAll} />
      <main className={`panel${practicing ? ' practice' : ''}`}>{children}</main>
    </div>
  );
}

/** 沒有步道的單欄頁面 */
export function SingleLayout({ practicing = false, children }: { practicing?: boolean; children: ReactNode }) {
  return (
    <div className="app single">
      <main className={`panel${practicing ? ' practice' : ''}`}>{children}</main>
    </div>
  );
}
