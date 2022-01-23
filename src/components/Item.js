function Item({ list }) {
  return (
    <div>
      {list.map((item) => {
        let string = item.tipo === 1 ? "" : " -";
        return (
          <li className={item.tipo === 1 ? "plus" : "minus"} key={item.id}>
            {item.operacao} <span>R$ {item.valor + string}</span>
            <button className="delete-btn">x</button>
          </li>
        );
      })}
    </div>
  );
}

export default Item;
