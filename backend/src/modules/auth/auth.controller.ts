import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { AuthService } from "./auth.service";
import { AuthRequest } from "@/middlewares/auth.middleware";
import { prisma } from "@/config/database";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);

      const result = await AuthService.login(
        validatedData.email,
        validatedData.password
      );

      return res.status(200).json({
        message: "Login Successfull",
        token: result.token,
        user: result.user,
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Login failed",
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      const result = await AuthService.register(data.email, data.password);

      console.log(res, "res");

      return res.status(201).json({
        message: "User registered successfully",
        token: result.token,
        user: result.user,
      });
    } catch (error: any) {
      const message = JSON.parse(error.message);
      return res.status(400).json({
        message: message || "Registration failed",
      });
    }
  }

  static async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      return res.status(200).json({ user });
    } catch (error) {}
  }
}
