import Blog from "../models/Blog.js";
import BlogContent from "../models/BlogContent.js";
import Category from "../models/Category.js";
import logger from "../utils/Logger.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import Comment from "../models/Comment.js";
import { Op } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBlogCategory = async (req, res) => {
  try {
    const { name } = req.body;

    await Category.create({
      name,
    });

    return res.json({ status: true, message: "New category created" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const loadCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json({ categories });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { categoryId, title, description, count } = req.body;
    const files = req.files;

    const fullUploadDir = path.join(__dirname, `../uploads`);
    fs.mkdirSync(fullUploadDir, { recursive: true });

    let mainImg = "";

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.fieldname === "image") {
          const fileName = `${Date.now()}${path.extname(file.originalname)}`;
          const filePath = path.join(fullUploadDir, fileName);
          fs.writeFileSync(filePath, file.buffer);
          mainImg = `/uploads/${fileName}`;
        }
      }
    }

    const newBlog = await Blog.create({
      ...req.body,
      image: mainImg,
    });

    await Blog.update(
      {
        slug: `${createSlug(title)}-${newBlog.id}`,
      },
      { where: { id: newBlog.id } }
    );

    for (let i = 0; i < parseInt(count); i++) {
      let img = "";
      if (files.length > 0) {
        for (let j = 0; j < files.length; j++) {
          const file = files[j];
          console.log(file);
          console.log(`image${j}`);

          if (file.fieldname === `image${i}`) {
            const fileName = `${Date.now()}${path.extname(file.originalname)}`;
            const filePath = path.join(fullUploadDir, fileName);
            fs.writeFileSync(filePath, file.buffer);
            img = `/uploads/${fileName}`;
          }
        }
      }
      const title = req.body[`title${i}`];
      const description = req.body[`description${i}`];
      await BlogContent.create({
        title,
        description,
        blogId: newBlog.id,
        image: img,
      });
    }

    return res.json({ status: true, message: "New blog created" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { contents } = req.body;

    const blog = await Blog.findByPk(id);

    await blog.update({
      ...req.body,
    });

    await BlogContent.destroy({ where: { blogId: id } });

    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      await BlogContent.create({
        ...content,
        blogId: id,
      });
    }

    return res.json({ status: true, message: "Blog updated" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

function createSlug(input) {
  return input
    .toString() // Ensure it's a string
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export const loadBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({
      where: {
        slug,
      },
      include: [
        { model: Category },
        { model: BlogContent },
        { model: Comment },
      ],
    });

    return res.json({ blog });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Comment.create({
      ...data,
      blogId: id,
    });

    return res.json({ message: "blog created" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const getRecommendedByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.findAll({
      where: {
        categoryId: id,
        id: {
          [Op.ne]: req.query.id,
        },
      },
      include: [{ model: Category }],
      limit: 10,
      order: [["id", "desc"]],
    });

    return res.json({ blogs });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const getLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: Category }],
      limit: 18,
      order: [["id", "desc"]],
    });
    return res.json({ blogs });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const getBlogsByCate = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Blog, limit: 10 }],
      limit: 3,
    });
    return res.json({ categories });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const getLatestBlogs1 = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: Category }],
      limit: 18,
      offset: 18,
      order: [["id", "desc"]],
    });
    return res.json({ blogs });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { category, search, offset } = req.query;
    const limit = 18;

    let categoryId = null;

    // Find category ID if category exists
    if (category) {
      const c = await Category.findOne({
        where: {
          slug: category,
        },
      });
      if (c) categoryId = c.id;
    }

    console.log(categoryId);

    // Determine if valid search or category exists
    const isSearchOrCategoryValid =
      (categoryId !== null &&
        categoryId !== undefined &&
        categoryId !== "null") ||
      (search && search !== "null" && search.trim().length > 0);

    // Query with valid conditions
    const blogs = await Blog.findAll({
      ...(isSearchOrCategoryValid && {
        where: {
          ...(categoryId && { categoryId: categoryId }),
          ...(search &&
            search !== "null" &&
            search.trim().length > 0 && {
              title: { [Op.like]: `%${search}%` },
            }),
        },
      }),
      include: [{ model: Category }],
      order: [["id", "desc"]],
      limit: limit,
      offset: parseInt(offset, 10),
    });

    return res.json({ blogs });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};
