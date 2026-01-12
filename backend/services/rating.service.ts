import { prisma } from '../lib/prisma';
import { TmdbService } from './tmdb.service';

export class RatingService {
    private tmdbService: TmdbService;

    constructor() {
        this.tmdbService = new TmdbService();
    }

    async createOrUpdateRating(userId: string, movieId: number, rating: number) {
        console.log('=== createOrUpdateRating START ===');
        console.log('Params:', { userId, movieId, rating });

        try {
            console.log('1. Buscando filme no banco...');
            let movie = await prisma.movie.findUnique({
                where: {
                    tmdbId: movieId
                }
            });
            console.log('Filme encontrado no banco:', movie);

            if (!movie) {
                console.log('2. Filme não existe, buscando no TMDb...');
                const movieDetails = await this.tmdbService.getMovieDetails(movieId);
                console.log('Detalhes do TMDb:', { id: movieDetails.id, title: movieDetails.title });

                console.log('3. Criando filme no banco...');
                movie = await prisma.movie.create({
                    data: {
                        tmdbId: movieId,
                        title: movieDetails.title
                    }
                });
                console.log('Filme criado:', movie);
            }

            console.log('4. Criando/atualizando rating...');
            const ratingRecord = await prisma.rating.upsert({
                where: {
                    userId_movieId: { userId, movieId: movie.id }
                },
                update: { rating },
                create: {
                    userId,
                    movieId: movie.id,
                    rating
                },
                include: { movie: true }
            });
            console.log('Rating salvo:', ratingRecord);
            console.log('=== createOrUpdateRating SUCCESS ===');
            return ratingRecord;
        } catch (error) {
            console.error('=== ERRO em createOrUpdateRating ===');
            console.error('Error:', error);
            throw error;
        }
    }

    async getUserRating(userId: string, movieId: number) {
        const movie = await prisma.movie.findUnique({
            where: { tmdbId: movieId }
        });
        if (!movie) {
            return null;
        }

        const rating = await prisma.rating.findUnique({
            where: {
                userId_movieId: { userId, movieId: movie.id }
            },
            include: { movie: true }
        });
        return rating;
    }

    async getAllUserRatings(userId: string) {
        const ratings = await prisma.rating.findMany({
            where: { userId },
            include: { movie: true },
            orderBy: { createdAt: 'desc' }
        });
        return ratings
    }

    async deleteRating(userId: string, movieId: number) {
        const movie = await prisma.movie.findUnique({
            where: { tmdbId: movieId }
        });

        if (!movie) {
            return null;
        }

        const deleted = await prisma.rating.delete({
            where: {
                userId_movieId: { userId, movieId: movie.id }
            }
        });
        return deleted;
    }


}