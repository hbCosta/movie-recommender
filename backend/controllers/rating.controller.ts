import { Request, Response } from 'express';
import { RatingService } from "../services/rating.service";
import { parse } from 'node:path';

interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}

export class RatingController {
    private ratingService: RatingService;

    constructor() {
        this.ratingService = new RatingService();
    }


    async rateMovie(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id;
            const movieId = parseInt(req.params.id);
            const { rating } = req.body;

            if (!userId) {
                return res.status(400).json({ error: 'Usuário não autenticado' });
            }

            if (!movieId) {
                return res.status(400).json({ error: 'Id do filme invalido' });
            }

            if (!rating || rating < 0 || rating > 5) {
                return res.status(400).json({ error: 'Rating deve ser entre 0 e 5' });
            }

            const result = await this.ratingService.createOrUpdateRating(
                userId,
                movieId,
                rating
            )
            return res.status(201).json(result);
        } catch (error) {
            console.error('Erro ao avaliar filme:', error);
            return res.status(500).json({ error: 'Erro ao avaliar filme' });
        }
    }


    async getMyRating(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id;
            const movieId = parseInt(req.params.id);

            if (!userId) {
                return res.status(400).json({ error: 'Usuário não autenticado' });
            }

            if (!movieId || isNaN(movieId)) {
                return res.status(400).json({ error: 'Id do filme inválido' });
            }

            const ratings = await this.ratingService.getUserRating(
                userId,
                movieId
            )

            return res.json(ratings);

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar avaliação' });
        }
    }

    async getMyRatings(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const ratings = await this.ratingService.getAllUserRatings(userId);

            return res.json(ratings);

        } catch (error) {
            console.error('Erro ao buscar avaliações', error);
            return res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }

    async deleteRating(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id;
            const movieId = parseInt(req.params.id);

            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            if (!movieId || isNaN(movieId)) {
                return res.status(401).json({ error: 'Id do filme inválido' })
            }

            const deleted = await this.ratingService.deleteRating(
                userId,
                movieId
            )
            if (!deleted) {
                return res.status(404).json({ error: 'Avaliação não encontrada' });
            }

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar avaliação' });
        }
    }

}