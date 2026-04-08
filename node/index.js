import express from "express";
import userRouter from "./routes/auth.route.js";
// import authRouter from "./routes/todoRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(express.json())
app.use("/api/v1/auth",userRouter)
app.use("/api/v1/todo", todoRoutes);
// app.use("",authRouter)
app.listen(3000, () => console.log("🚀 Server running on port 3000"));