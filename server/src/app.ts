import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { applicantsRouter } from "./routes/applicants.routes.js";
import { authRouter } from "./routes/auth.routes.js";

export const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ success: true, service: "restaurant-hiring-hub-api" });
});

app.use("/api/auth", authRouter);
app.use("/api/applicants", applicantsRouter);
