import type { HintMessage } from '../hooks/useSyllableTyping';

export function HintBox({ hint }: { hint: HintMessage | null }) {
  return (
    <div className="hint-slot" aria-live="polite">
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
    </div>
  );
}
