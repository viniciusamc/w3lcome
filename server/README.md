# API - W3lcome

---

Projeto de um side-server para ToDo list, sem utilizar banco de dados, apenas com Array

---

## Tecnologias Utilizadas:

- Express
- Typescript
- Cors

---

### Como iniciar o projeto

```bash
$ git clone git@github.com:viniciusamc/w3lcome.git

$ cd w3lcome

$ cd server

$ yarn install

$ yarn dev // Porta padrão - 3000

```

---

### Endpoints

- POST /tasks: Aceita um objeto JSON com titulo: String e concluido:Boolean
- GET /tasks: Manda o array de tarefas
- PATCH /tasks:id Manda um JSON para alterar a tarefa
- DELETE /tasks:id Deleta a Tarefa
