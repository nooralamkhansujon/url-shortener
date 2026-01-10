import { AuthRequest } from "@/middlewares/auth.middleware";
import { createUrlSchema } from "./url.schema";
import { UrlService } from "./url.service";
import { Response } from "express";

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
}
