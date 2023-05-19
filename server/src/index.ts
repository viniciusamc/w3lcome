import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import "express-async-errors";
require("dotenv").config();
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(500).json({
    status: 500,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
