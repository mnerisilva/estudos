import { useState, useEffect } from "react";
import "./App.css";
import Api from "./services/Api";
import Item from "./components/Item";

function App() {
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [saldo, setSaldo] = useState(2550);
  const [api, setApi] = useState(Api);
  const [inputoperacao, setInputoperacao] = useState("");
  const [inputvalor, setInputvalor] = useState("");

  useEffect(() => {
    let _saldo = saldo;
    let _receitas = receitas;
    let _despesas = despesas;
    api.map((item) => {
      if (item.valor < 0) {
        _despesas = _despesas + item.valor;
      } else if (item.valor > 0) {
        _receitas = receitas + item.valor;
      }
      _saldo = _saldo + item.valor;
      //return true;
    });
    setSaldo(_saldo);
    setReceitas(_receitas);
    setDespesas(_despesas);
  }, [api]);

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
    console.log("campo1 " + inputoperacao, "campo2 " + inputvalor);
    if (inputoperacao === "" || inputvalor === "") {
      setInputoperacao("");
      setInputvalor("");
      return;
    }
    //let saldoProvisorio = saldo + inputvalor;
    //setSaldo(saldoProvisorio);
    //setDespesas(inputvalor);
    console.log(inputoperacao, inputvalor);
    let x = { id: 5, operacao: inputoperacao, valor: inputvalor };
    //arrOperacao.push(x);
    //console.log("opera " + JSON.stringify(arrOperacao));
    //setApi(arrOperacao);
    setApi([...api, x]);
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
          <Item list={api} />
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
