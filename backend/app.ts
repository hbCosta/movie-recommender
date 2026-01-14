import express from "express";
import cors from 'cors';
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import movieRoutes from './routes/movies';
import ratingRoutes from './routes/rating';


const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}))

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/ratings', ratingRoutes);


export default app;