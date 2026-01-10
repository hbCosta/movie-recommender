import { Router } from "express";
import {UserController} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.use(authMiddleware);

// PERFIL
router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);

export default router