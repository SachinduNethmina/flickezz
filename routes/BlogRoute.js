import express from "express";
import { AdminAuthMiddleware } from "../middlewares/AdminAuthMiddleware.js";
import {
  addComment,
  createBlog,
  createBlogCategory,
  getBlogsByCate,
  getLatestBlogs,
  getLatestBlogs1,
  getRecommendedByCategoryId,
  loadBlog,
  loadCategories,
  searchPosts,
  updateBlog,
} from "../controllers/BlogController.js";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.get("/categories", loadCategories);
router.post("/category/create", AdminAuthMiddleware, createBlogCategory);
router.post("/", AdminAuthMiddleware, upload.any(), createBlog);
router.post("/update/:id", AdminAuthMiddleware, updateBlog);
router.get("/:slug", loadBlog);
router.get("/recommended-cid/:id", getRecommendedByCategoryId);
router.post("/comment/:id", addComment);
router.get("/latest/blog", getLatestBlogs);
router.get("/latest/blog1", getLatestBlogs1);
router.get("/latest/blog/3", getBlogsByCate);
router.get("/latest/blog/search", searchPosts);

export default router;
