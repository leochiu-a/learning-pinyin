import { COURSE } from '../lib/course';

interface Props {
  li: number;
  learning: boolean;
  onLearn: () => void;
  onPractice: () => void;
}

export function LessonHead({ li, learning, onLearn, onPractice }: Props) {
  const l = COURSE[li];
  return (
    <div className="lhead">
      <div>
        <p className="eyebrow">
          {l.isMix ? '最後一關' : `第 ${li + 1} 步`} · {l.sub}
        </p>
        <h2>{l.title}</h2>
      </div>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={learning} onClick={onLearn}>
          學習
        </button>
        <button role="tab" aria-selected={!learning} onClick={onPractice}>
          打字練習
        </button>
      </div>
    </div>
  );
}
