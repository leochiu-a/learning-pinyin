export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text: string) {
  if (!canSpeak || !text) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-TW';
    u.rate = 0.8;
    const voice = speechSynthesis.getVoices().find(v => /zh[-_]TW/i.test(v.lang));
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  } catch {
    /* 瀏覽器不支援語音就不發音 */
  }
}
