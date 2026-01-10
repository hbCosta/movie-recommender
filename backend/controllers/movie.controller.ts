import express from "express";
import { prisma } from "../lib/prisma";


interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}
export class MovieController {
    async getMovies(req: AuthRequest, res: express.Response){
        try{
            const movies = await prisma.movie.findMany({
                where: {
                    id: req.user?.id,
                },
                select: {
                    id: true, 
                    title: true,
                },
            });
            if(!movies){
                return res.status(404).json({ error: "Filmes não encontrados." });
            }
            return res.json(movies);

        } catch (error){
            console.error("Erro ao buscar filmes", error);
            return res.status(500).json({ error: "Erro ao buscar filmes." });
        }
    }
}