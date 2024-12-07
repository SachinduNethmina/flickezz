import express from "express";
import {
  downloadVideo,
  getLatestMovies,
  getPopularLatestMovies,
  getPopularMovies,
  getSubtitles,
  loadMovie,
  loadRecommended,
  searchMovies,
  streamVideo,
} from "../controllers/MoviesController.js";
import { VideoAuthMiddleware } from "../middlewares/VideoAuthMiddleware.js";
const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/latest", getLatestMovies);
router.get("/for-you", getPopularLatestMovies);
router.get("/search", searchMovies);
router.get("/movie/:slug", loadMovie);
router.get("/recommended", loadRecommended);
router.get("/subtitles/:id", VideoAuthMiddleware, getSubtitles);
router.get("/stream/:id", VideoAuthMiddleware, streamVideo);
router.get("/download/:id", VideoAuthMiddleware, downloadVideo);

export default router;
