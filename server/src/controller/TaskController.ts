import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

interface Task {
  id: number;
  titulo: string;
  concluida: boolean;
}

let ids: number = 0;
let tasks: Task[] = [];

class TaskController {
  index(req: Request, res: Response) {
    res.status(201).json(tasks);
  }

  create(req: Request, res: Response) {
    const { titulo } = req.body;
    ids += 1;
    let id = ids;

    if (!titulo) {
      throw new AppError("Titulo da tarefa é obrigatório");
    }

    tasks.push({
      id,
      titulo,
      concluida: false,
    });

    res.status(201).json("Tarefa criada!");
  }

  update(req: Request, res: Response) {
    const { titulo, concluida } = req.body;
    const id = Number(req.params.id);

    const taskIndex = tasks.findIndex((taskId) => taskId.id === id);

    if (taskIndex < 0) {
      throw new AppError("Tarefa não encontrada");
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      titulo,
      concluida,
    };

    res.json(tasks[taskIndex]);
  }

  delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    tasks = tasks.filter((task) => task.id !== id);

    res.json({ message: "Tarefa removida com sucesso!" });
  }
}

export { TaskController };
