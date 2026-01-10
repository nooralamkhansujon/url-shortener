import { prisma } from "@/config/database";
import { AuthRequest } from "@/middlewares/auth.middleware";
import { RedirectService } from "./redirect.service";
import { Response } from "express";

export class RedirectController {
  static async redirect(req: AuthRequest, res: Response) {
    try {
      const { shortCode } = req.params;

      const originalUrl = await RedirectService.redirect(shortCode as string);
      return res.redirect(302, originalUrl);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Redirect Failed",
      });
    }
  }
}
