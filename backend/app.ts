import express from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



export default app;