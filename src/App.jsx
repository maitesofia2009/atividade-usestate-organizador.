import { useState } from "react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = total - concluidas;

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }
    if (filtro === "concluidas") {
      return tarefa.concluida;
    }
    return true;
  });

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();
    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false
    };

    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) => {
        if (tarefa.id === id) {
          return { ...tarefa, concluida: !tarefa.concluida };
        }

        return tarefa;
      })
    );
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }

  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida)
    );
  }

  return (
    <main>
      <h1>Organizador de tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <p>
        Total: {total} | Concluídas: {concluidas} | Pendentes: {pendentes}
      </p>

      <div>
        <button type="button" onClick={() => setFiltro("todas")}>
          Todas
        </button>
        <button type="button" onClick={() => setFiltro("pendentes")}>
          Pendentes
        </button>
        <button type="button" onClick={() => setFiltro("concluidas")}>
          Concluídas
        </button>
        <button type="button" onClick={limparConcluidas}>
          Limpar concluídas
        </button>
      </div>

      <ul>
        {tarefasVisiveis.length === 0 && (
          <li>Nenhuma tarefa para exibir.</li>
        )}
        {tarefasVisiveis.map((tarefa) => (
          <li key={tarefa.id}>
            <label>
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarConclusao(tarefa.id)}
              />
              <span
                style={{
                  textDecoration: tarefa.concluida ? "line-through" : "none"
                }}
              >
                {tarefa.texto}
              </span>
            </label>
            <button
              type="button"
              onClick={() => removerTarefa(tarefa.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}