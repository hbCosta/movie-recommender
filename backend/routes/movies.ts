import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { RatingController } from "../controllers/rating.controller";

const router = Router();
const movieController = new MovieController();
const ratingController = new RatingController();

router.use(authMiddleware);

// Busca e Descoberta 
router.get('/search', movieController.searchMovies.bind(movieController));
router.get('/popular', movieController.getPopularMovies.bind(movieController));
router.get('/:id', movieController.getMovieDetails.bind(movieController));

router.post('/:id/rating', ratingController.rateMovie.bind(ratingController));
router.get('/:id/rating', ratingController.getMyRating.bind(ratingController));
router.delete('/:id/rating', ratingController.deleteRating.bind(ratingController));



export default router;

