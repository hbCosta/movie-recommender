import { prisma } from '../lib/prisma';
import { TmdbService } from './tmdb.service';

export class RecommendationService {
    private tmdbService: TmdbService;

    constructor() {
        this.tmdbService = new TmdbService();
    }

    async getRecommendationsForUser(userId: string, limit: number = 20) {
        const allRatings = await prisma.rating.findMany({
            where: { userId },
            include: { movie: true },
            orderBy: { rating: 'desc' }
        });

        if (allRatings.length === 0) {
            return [];
        }

        const ratedTmdbIds = new Set(allRatings.map((r) => r.movie.tmdbId));

        const topRated = allRatings.filter((r) => r.rating >= 4).slice(0, 10);
        const seedMovies = topRated.length > 0 ? topRated : allRatings.slice(0, 10);

        const scored = new Map<number, { movie: any; score: number }>();

        for (const seed of seedMovies) {
            try {
                const result = await this.tmdbService.getMovieRecommendations(seed.movie.tmdbId, 1);

                for (const candidate of result.results || []) {
                    if (ratedTmdbIds.has(candidate.id)) continue;

                    const existing = scored.get(candidate.id);
                    if (existing) {
                        existing.score += seed.rating;
                    } else {
                        scored.set(candidate.id, { movie: candidate, score: seed.rating });
                    }
                }
            } catch (error) {
                console.error(`Erro ao buscar recomendações para o filme ${seed.movie.tmdbId}:`, error);
            }
        }

        return Array.from(scored.values())
            .sort((a, b) => b.score - a.score || (b.movie.vote_average ?? 0) - (a.movie.vote_average ?? 0))
            .slice(0, limit)
            .map((entry) => entry.movie);
    }
}
