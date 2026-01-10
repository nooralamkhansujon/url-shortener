import { prisma } from "@/config/database";
import { redis } from "@/config/redis";

export class RedirectService {
  static async redirect(shortCode: string) {
    const cacheKey = `url:${shortCode}`;
    const cacheUrl = await redis.get(cacheKey);

    if (cacheUrl) {
      if (cacheUrl) {
        RedirectService.updateClickCount(undefined, shortCode);
      }

      console.log("from cache", cacheUrl);
      return cacheUrl;
    }

    const url = await prisma.url.findUnique({
      where: { shortCode },
    });

    if (!url) {
      throw new Error("Short URL not found");
    }

    //cache result
    await redis.set(cacheKey, url.originalUrl, "EX", 60 * 60 * 24);

    //Increment click count
    RedirectService.updateClickCount(url.id);
    return url.originalUrl;
  }

  static async updateClickCount(
    urlId?: string,
    shortCode?: string
  ): Promise<void> {
    const condition = shortCode ? { shortCode } : { id: urlId };
    console.log(condition, "condition");
    await prisma.url.update({
      where: condition,
      data: {
        clickCount: { increment: 1 },
      },
    });
  }
}
