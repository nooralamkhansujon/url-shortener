import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);


//protected routes
router.get('/user', authMiddleware,AuthController.getCurrentUser)

export default router;
