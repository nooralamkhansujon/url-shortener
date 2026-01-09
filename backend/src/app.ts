import express from "express";
import authRoutes from "@/modules/auth/auth.routes";
import urlRoutes from "@/modules/url/url.routes";
import redirectRoutes from "@/modules/redirect/redirect.routes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);

export default app;
