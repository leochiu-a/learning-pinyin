import { useCallback, useState } from 'react';

/** 存在這台瀏覽器的設定；讀寫失敗（無痕模式等）時退回預設值 */
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s == null ? initial : (JSON.parse(s) as T);
    } catch {
      return initial;
    }
  });
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue(prev => {
        const v = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(v));
        } catch {
          /* 存不了就只留在這次瀏覽 */
        }
        return v;
      });
    },
    [key],
  );
  return [value, update] as const;
}
