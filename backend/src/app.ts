import express from "express";
import authRoutes from "@/modules/auth/auth.routes";
import urlRoutes from "@/modules/url/url.routes";
import redirectRoutes from "@/modules/redirect/redirect.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);

export default app;
