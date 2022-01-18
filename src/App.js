import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [saldo, setSaldo] = useState(2550);
  const [inputoperacao, setInputoperacao] = useState("");
  const [inputvalor, setInputvalor] = useState(0);
  //const [operacao, setOperacao] = useState([]);

  const arrOperacao = [
    { id: 1, operacao: "Salário", valor: 3700 },
    { id: 2, operacao: "Giassi", valor: -150 },
  ];

  useEffect(() => {
    alert(arrOperacao[0].id);
  }, []);

  function operacao(e) {
    if (e.target.name === "input_operacao") {
      setInputoperacao(e.target.value);
    } else if (e.target.name === "input_valor") {
      setInputvalor(parseInt(e.target.value));
    }
  }
  //console.log(inputoperacao, inputvalor);

  function submit(e) {
    e.preventDefault();
    //alert("Enviei o formulário " + inputoperacao + " - " + inputvalor);
    let saldoProvisorio = saldo - inputvalor;
    let despesasProvisorio = saldo - inputvalor;
    setSaldo(saldoProvisorio);
    setDespesas(inputvalor);
    setInputoperacao("");
    setInputvalor("");
  }

  return (
    <>
      <h2>Controle de despesas</h2>

      <div className="container">
        <h4>Saldo atual</h4>

        <h1 id="balance" className="balance">
          R$ {saldo}
        </h1>

        <div className="inc-exp-container">
          <div>
            <h4>Receitas</h4>
            <p id="money-plus" className="money plus">
              + R${receitas}
            </p>
          </div>

          <div>
            <h4>Despesas</h4>
            <p id="money-minus" className="money minus">
              - R${despesas}
            </p>
          </div>
        </div>

        <h3>Transações</h3>

        <ul id="transactions" className="transactions">
          {arrOperacao.map((item) => {
            return (
              <li className="plus" key={item.id}>
                {item.operacao} <span>R$ {item.valor}</span>
                <button className="delete-btn">x</button>
              </li>
            );
            console.log(item.id);
          })}
        </ul>

        <h3>Adicionar transação</h3>
        {/****/}
        <form id="form" onSubmit={submit}>
          <div className="form-control">
            <label htmlFor="text">Nome</label>
            <input
              autoFocus
              type="text"
              id="text"
              name="input_operacao"
              placeholder="Nome da transação"
              value={inputoperacao}
              onChange={operacao}
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount">
              Valor <br />
              <small>(negativo - despesas, positivo - receitas)</small>
            </label>
            <input
              type="number"
              id="amount"
              name="input_valor"
              placeholder="Valor da transação"
              value={inputvalor}
              onChange={operacao}
            />
          </div>

          <button type="submit" className="btn">
            Adicionar
          </button>
        </form>
        {/****/}
      </div>
    </>
  );
}

export default App;
