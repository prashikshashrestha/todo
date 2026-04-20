import express from "express";
import {
  createTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  getTodosHandler
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/create", createTodoHandler);
router.put("/update/:id", updateTodoHandler);
router.delete("/delete/:id", deleteTodoHandler);
router.get("/get", getTodosHandler);

export default router;
















// import express from 'express'
// import { createTodo } from '../controllers/todo.controller.js'
// const authRouter=express.Router()
// authRouter.post('/create-todo', createTodo)
// export default authRouter