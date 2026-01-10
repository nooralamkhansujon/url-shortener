import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import { UrlController } from "./url.controller";

const router = Router();

router.post("/", authMiddleware, UrlController.createShortUrl);

export default router;
