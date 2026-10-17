import { canSpeak, speak } from '../lib/speech';

export function SayButton({ text }: { text: string }) {
  if (!canSpeak || !text) return null;
  return (
    <button className="say" onClick={() => speak(text)} aria-label={`播放「${text}」的讀音`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M19 5a10 10 0 0 1 0 14" />
      </svg>
    </button>
  );
}
