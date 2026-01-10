import express from "express";
import { prisma } from "../lib/prisma";
import {  TmdbService } from "../services/tmdb.service";

interface AuthRequest extends express.Request {
    user?: {
        id: string;
    }
}
export class MovieController {
    async searchMovies(req: AuthRequest, res: express.Response){
        try{
            const query = req.query.query as string;
            const page = parseInt(req.query.page as string) || 1;

            if (!query){
                return res.status(400).json({error: "Query é obrigatória"});
            }
            const tmdbService = new TmdbService();
            const movies = await tmdbService.searchMovies(query, page);

            return res.json(movies);

        } catch (error){
            console.error("Erro ao buscar filmes", error);
            return res.status(500).json({ error: "Erro ao buscar filmes." });
        }
    }

    async getMovieDetails(req: AuthRequest, res: express.Response){
        try { 
            const movieId = parseInt(req.params.id);
            if(!movieId || isNaN(movieId)){
                return res.status(400).json({error:"Id do filme inválido"})
            }
            const tmdbService = new TmdbService();
            const moviesDetails = await tmdbService.getMovieDetails(movieId);

            return res.json(moviesDetails);
        } catch (error){
            return res.status(500).json({error: "Erro ao buscar detalhes do filme."})
        }
    }

    async getPopularMovies(req: AuthRequest, res: express.Response){
        try {
            const page = parseInt(req.query.page as string) || 1;
            
            const tmdbService = new TmdbService();
            const movies = await  tmdbService.getPopularMovies(page);

            return res.json(movies);

        } catch (error) {
            return res.status(500).json({error: "Erro ao buscar filmes populares"})
        }
    }
    
    async getRecommendations(req: AuthRequest, res: express.Response){
        try{
            const userId = req.user?.id;
            if(!userId){
                return res.status(401).json({error:"Usuário não autenticado"});
            }
            
        } catch (error){
            return res.status(500).json({error: "Erro ao buscar recomendações"})
        }
    }
    
}