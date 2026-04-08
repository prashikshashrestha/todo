import express from "express";
import { signInHandler } from "../controllers/auth.js";
const userRouter=express.Router()
userRouter.post('/signin',signInHandler)
export default userRouter