import { Router } from "express";
import { TaskController } from "../controller/TaskController";

const router = Router();
const taskController = new TaskController();

router.get("/", taskController.index);
router.post("/", taskController.create);
router.patch("/:id", taskController.update);
router.delete("/:id", taskController.delete);

export { router };
