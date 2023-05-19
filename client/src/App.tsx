import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [titulo, setTitulo] = useState<string>("");

  async function handleNewTarefa(titulo: string, concluida: boolean) {
    await axios
      .post("http://localhost:3000/tasks", { titulo, concluida })
      .then(
        (response) => (
          setTarefas([...tarefas, response.data]),
          alert("Tarefa adicionada com sucesso!")
        )
      );
  }

  async function handleDone(id: number) {
    await axios
      .patch(`http://localhost:3000/tasks/${id}`, {
        titulo: titulo,
        concluida: true,
      })
      .then((response) => setTarefas([...tarefas, response.data]));
  }

  async function handleDelete(id: number) {
    await axios.delete("http://localhost:3000/tasks/" + id);

    if (tarefas.length === 1) {
      setTarefas([]);
    }

    alert("Tarefa deletada com sucesso!");
  }

  async function handleUndo(id: number) {
    await axios
      .patch(`http://localhost:3000/tasks/${id}`, {
        titulo: titulo,
        concluida: false,
      })
      .then((response) => setTarefas([...tarefas, response.data]));
  }

  useEffect(() => {
    async function getTarefas() {
      await axios
        .get("http://localhost:3000/tasks")
        .then((response) => setTarefas(response.data));
    }

    getTarefas();
  }, [tarefas]);

  return (
    <main>
      <h1>Controle de Tarefas</h1>

      <form
        onSubmit={(e) => (e.preventDefault(), handleNewTarefa(titulo, false))}
      >
        <input
          type="text"
          placeholder="Título da tarefa"
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul className={"pending-task"}>
        {tarefas
          .filter((tarefa) => tarefa.concluida === false)
          .map((tarefa) => (
            <li key={tarefa.id}>
              {tarefa.id} {tarefa.titulo} -{" "}
              {tarefa.concluida ? "Concluída" : "Pendente"}
              <div>
                <button onClick={() => handleDone(tarefa.id)}>Concluido</button>
                <button onClick={() => handleDelete(tarefa.id)}>Deletar</button>
              </div>
            </li>
          ))}
      </ul>

      <h2>{`${
        tarefas.filter((tarefa) => tarefa.concluida).length === 0
          ? ""
          : "Tarefas Concluídas"
      }`}</h2>

      <ul className={"completed-task"}>
        {tarefas
          .filter((tarefa) => tarefa.concluida === true)
          .map((tarefa) => (
            <li>
              {tarefa.id} {tarefa.titulo} - Concluida
              <div>
                <button onClick={() => handleDelete(tarefa.id)}>Deletar</button>
                <button onClick={() => handleUndo(tarefa.id)}>Desfazer</button>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
