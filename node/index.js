import express from "express";//http server 
import cors from "cors";// request filtering coming from frontend
import userRouter from "./routes/auth.route.js";
// import authRouter from "./routes/todoRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express(); 
app.use(cors()); //middleware which filters the req coming from frontend before reaching to backend
app.use(express.json()) //to pass data coming from frontend in req.body
app.use("/api/v1/auth",userRouter);// route setpupppp
app.use("/api/v1/todo", todoRoutes);
// app.use("",authRouter)
app.listen(3000, () => console.log("🚀 Server running on port 3000"));