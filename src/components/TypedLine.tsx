interface Props {
  value: string;
  /** 從頭算起打對了幾個字 */
  matched: number;
  solved: boolean;
  /** 每次變大就搖一下，提醒這次輸入沒被收到 */
  shake: number;
}

export function TypedLine({ value, matched, solved, shake }: Props) {
  return (
    <div key={shake} className={`typed${solved ? ' win' : ''}${shake ? ' shake' : ''}`}>
      {solved ? (
        value
      ) : value ? (
        <>
          <span className="ok">{value.slice(0, matched)}</span>
          <span className="bad">{value.slice(matched)}</span>
          <span className="caret" />
        </>
      ) : (
        <>
          <span className="ph">點這裡開始打字</span>
          <span className="caret" />
        </>
      )}
    </div>
  );
}
