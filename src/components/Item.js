function Item({ list }) {
  return (
    <div>
      {list.map((item) => {
        return (
          <li className={item.tipo === 1 ? "plus" : "minus"} key={item.id}>
            {item.operacao} <span>R$ {item.valor}</span>
            <button className="delete-btn">x</button>
          </li>
        );
      })}
    </div>
  );
}

export default Item;
