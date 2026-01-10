import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const movieController = new MovieController();

router.use(authMiddleware);

// Busca e Descoberta 
router.get('/search', movieController.searchMovies.bind(movieController));
router.get('/popular', movieController.getPopularMovies.bind(movieController));
router.get('/:id', movieController.getMovieDetails.bind(movieController));



export default router;

