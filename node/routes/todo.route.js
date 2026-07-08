import express from "express";
import {
  createTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  getTodosHandler
} from "../controllers/todo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTodoHandler);
router.put("/update/:id", authMiddleware, updateTodoHandler);
router.delete("/delete/:id", authMiddleware, deleteTodoHandler);
router.get("/get", authMiddleware, getTodosHandler);

export default router;
















// import express from 'express'
// import { createTodo } from '../controllers/todo.controller.js'
// const authRouter=express.Router()
// authRouter.post('/create-todo', createTodo)
// export default authRouter