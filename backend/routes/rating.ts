import { Router } from 'express';
import { RatingController } from '../controllers/rating.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const ratingController = new RatingController();

router.use(authMiddleware);

router.get('/me', ratingController.getMyRating.bind(ratingController));
router.get('/me/all', ratingController.getMyRatings.bind(ratingController));

export default router;
