import { TABLE } from '../data/table';

export function TableView() {
  return (
    <>
      <p className="eyebrow">隨時回來查</p>
      <h2>注音拼音對照表</h2>
      <p className="lede">左上是注音，下面是拼音。「單獨」指前面沒有聲母、自己成一個字時的寫法。</p>
      <div className="legend"><i />和注音直覺不同，最容易打錯</div>
      {TABLE.map(([name, cells]) => (
        <section className="tgroup" key={name}>
          <h3>{name}</h3>
          <div className="tgrid">
            {cells.map(([z, p, note, trap]) => (
              <div className={`cell${trap ? ' trap' : ''}`} key={z}>
                <span className="zy">{z}</span>
                <span className="py">{p}</span>
                {note && <small>{note}</small>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
