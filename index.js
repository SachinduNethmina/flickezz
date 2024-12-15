import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./config/db.js";
import { syncDb } from "./config/syncDb.js";

import MovieRoute from "./routes/MoviesRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SitemapRoute from "./routes/SitemapRoute.js";
import BlogRoute from "./routes/BlogRoute.js";

import { fileURLToPath } from "url";
import path from "path";

import rateLimit from "express-rate-limit";
import ErrorHandler from "./middlewares/ErrorHandler.js";
import logger from "./utils/Logger.js";

const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
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
app.use(express.json({ limit: '100mb' }));  // Adjust '10mb' as needed
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(globalLimiter);


app.use("/api/movies/", MovieRoute);
app.use("/api/auth/", AuthRoute);
app.use("/api/blog/", BlogRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(ErrorHandler);

app.use(SitemapRoute);

const staticFrontend = path.join(__dirname, "flickezz", "dist");
app.use(express.static(staticFrontend));

app.get("*", (req, res) => {
  res.sendFile(path.join(staticFrontend, "index.html"));
});

app.listen(port, async () => {
  logger.info("Server running on port " + port);
  await dbConnect();
  await syncDb();
});
