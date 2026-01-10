import { prisma } from "@/config/database";
import { generateShortCode } from "@/utils/generateShortCode";

const MAX_FREE_URLS = 100;

export class UrlService {
  static async createUrl(userId: string, originalUrl: string) {
    //1. check usage limit
    const urlCount = await prisma.url.count({
      where: { userId },
    });

    if (urlCount >= MAX_FREE_URLS) {
      throw new Error(
        "Free limit reached (100 URLs). Please upgrade your plan."
      );
    }

    //2. generate unique short code

    let shortCode: string = generateShortCode(6);
    let exists = true;

    while (exists) {
      const existing = await prisma.url.findUnique({
        where: { shortCode },
      });
      exists = !!existing;
      shortCode = generateShortCode(6);
    }

    //3. save url
    const url = await prisma.url.create({
      data: {
        originalUrl,
        shortCode,
        userId,
      },
    });

    return url;
  }

  static async getUrls(userId: string) {
    const urls = await prisma.url.findMany({
      where: { userId },
    });

    return urls || [];
  }

  static async delete(userId: string, id: string) {
    const url = await prisma.url.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!url) {
      throw new Error("URL not found or unauthroized");
    }

    await prisma.url.delete({
      where: { id: url.id },
    });
  }
}
