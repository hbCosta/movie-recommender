import express from "express";
import cors from 'cors';
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import movieRoutes from './routes/movies';
import ratingRoutes from './routes/rating';


const localOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];
const envOrigins = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const app = express();
app.use(cors({
    origin: [...localOrigins, ...envOrigins],
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