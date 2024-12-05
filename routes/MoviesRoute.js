import express from "express";
import {
  getLatestMovies,
  getPopularLatestMovies,
  getPopularMovies,
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
router.get("/stream/:id", VideoAuthMiddleware, streamVideo);

export default router;
