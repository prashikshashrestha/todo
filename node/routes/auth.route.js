import express from "express";
import { signInHandler ,signUpHandler} from "../controllers/auth.js";
const userRouter=express.Router()
userRouter.post('/signup',signUpHandler)
userRouter.post('/signin',signInHandler)
export default userRouter