import { useState, useEffect } from "react";
import "./App.css";
//import Api from "./services/Api";
import Item from "./components/Item";

const Api = [
  /*
  { id: 1, operacao: "Salários", valor: 3700, tipo: 1 },
  { id: 2, operacao: "Supermercado Giassi", valor: 150, tipo: 2 },
  { id: 3, operacao: "Dentista - consulta", valor: 350, tipo: 2 },
  { id: 4, operacao: "Médico - consulta", valor: 650, tipo: 2 },
  { id: 5, operacao: "Vale", valor: 650, tipo: 1 },
  { id: 6, operacao: "Botijão de gás", valor: 120, tipo: 2 },*/
];

function App() {
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [api, setApi] = useState(Api);
  const [tipo, setTipo] = useState();
  const [inputoperacao, setInputoperacao] = useState("");
  const [inputvalor, setInputvalor] = useState("");

  useEffect(() => {
    console.log("opera " + JSON.stringify(api));
    let _saldo = 0;
    let _receitas = 0;
    let _despesas = 0;
    setSaldo(0);
    setReceitas(0);
    setDespesas(0);
    for (let item in api) {
      if (api[item].tipo === 2) {
        _despesas = _despesas - api[item].valor;
        //setDespesas(_despesas);
        _saldo = _saldo - api[item].valor;
        //setSaldo(_saldo);
      } else {
        _receitas = _receitas + api[item].valor;
        //setReceitas(_receitas);
        _saldo = _saldo + api[item].valor;
        //setSaldo(_saldo);
      }
      setDespesas(_despesas);
      setReceitas(_receitas);
      setSaldo(_saldo);
    }
    console.log("Despesas: " + _despesas);
    console.log("Receitas: " + _receitas);
    console.log("Saldo: " + _saldo);
    //setSaldo(_saldo);
    //setReceitas(_receitas);
    //setDespesas(_despesas);
    //console.log("api após atualização useEffect: " + JSON.stringify(api));
  }, [api]);

  function operacao(e) {
    if (e.target.name === "input_operacao") {
      setInputoperacao(e.target.value);
    } else if (e.target.name === "input_valor") {
      setInputvalor(parseInt(e.target.value));
    }
    if (e.target.name === "tipo") {
      setTipo(parseFloat(e.target.value));
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
    console.log(inputoperacao, inputvalor);
    let tipo_operacao = tipo;
    let indice = api.length + 1;
    let x = {
      id: indice,
      operacao: inputoperacao,
      valor: inputvalor,
      tipo: tipo_operacao,
    };
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
            <input
              autoFocus
              type="radio"
              id="tipo_receita"
              name="tipo"
              value={1}
              onChange={operacao}
            />
            <label htmlFor="tipo">Receita</label>
          </div>
          <div className="form-control">
            <input
              autoFocus
              type="radio"
              id="tipo_despesa"
              name="tipo"
              value={2}
              onChange={operacao}
            />
            <label htmlFor="tipo">Despesas</label>
          </div>
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
