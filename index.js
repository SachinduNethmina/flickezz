import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./config/db.js";
import { syncDb } from "./config/syncDb.js";

import MovieRoute from "./routes/MoviesRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

import { fileURLToPath } from "url";
import path from "path";

import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST"],
    origin: [process.env.ORIGIN1],
  })
);
app.use(globalLimiter);

app.use("/api/movies/", MovieRoute);
app.use("/api/auth/", AuthRoute);

const staticFrontend = path.join(__dirname, "flickezz", "dist");
app.use(express.static(staticFrontend));

app.get("*", (req, res) => {
  res.sendFile(path.join(staticFrontend, "index.html"));
});

app.listen(port, async () => {
  console.log("Server running on port", port);
  await dbConnect();
  await syncDb();
});
