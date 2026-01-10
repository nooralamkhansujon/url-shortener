import { Router } from "express";
import { RedirectController } from "./redirect.controller";

const router = Router();

router.get("/:shortCode", RedirectController.redirect);

export default router;
