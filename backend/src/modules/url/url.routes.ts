import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import { UrlController } from "./url.controller";

const router = Router();

router.get("/", authMiddleware, UrlController.getUrls);
router.post("/", authMiddleware, UrlController.createShortUrl);

router.delete("/:id", authMiddleware, UrlController.deleteShortUrl);

export default router;
