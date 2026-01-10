import { AuthRequest } from "@/middlewares/auth.middleware";
import { createUrlSchema } from "./url.schema";
import { UrlService } from "./url.service";
import { Response } from "express";
import { prisma } from "@/config/database";

export class UrlController {
  static async createShortUrl(req: AuthRequest, res: Response) {
    try {
      const { originalUrl } = createUrlSchema.parse(req.body);
      const userId = req.user!.userId;
      const url = await UrlService.createUrl(userId, originalUrl);

      return res.status(201).json({
        message: "Short URL created",
        data: {
          id: url.id,
          originalUrl: url.originalUrl,
          shortCode: url.shortCode,
          shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
          clickCount: url.clickCount,
          createdAt: url.createdAt,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Failed to create short URL",
      });
    }
  }

  static async getUrls(req: AuthRequest, res: Response) {
    const userId = req.user!.userId;

    const urls = await UrlService.getUrls(userId);

    return res.status(200).json({
      message: "success",
      urls,
    });
  }

  static async deleteShortUrl(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const userId = req.user!.userId;

      UrlService.delete(userId, id as string);

      return res.status(200).json({
        message: "short url deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Failed to create short URL",
      });
    }
  }
}
