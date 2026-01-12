import express from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import movieRoutes from './routes/movies';
import ratingRoutes from './routes/rating';


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/ratings', ratingRoutes);


export default app;