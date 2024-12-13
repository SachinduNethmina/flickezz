import Blog from "../models/Blog.js";
import BlogContent from "../models/BlogContent.js";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import Movie from "../models/Movie.js";
import Torrent from "../models/Torrent.js";
import User from "../models/User.js";
import logger from "../utils/Logger.js";
import { sequelize } from "./db.js";

export const syncDb = async () => {
  try {
    await sequelize.sync();
    logger.info("Database synced");
  } catch (error) {
    logger.error("Databse sync failed", error);
  }
};
