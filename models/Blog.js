import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Category from "./Category.js";

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: DataTypes.BIGINT,
      references: {
        key: "id",
        model: Category,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true }
);

Category.hasMany(Blog, { foreignKey: "categoryId" });
Blog.belongsTo(Category, { foreignKey: "categoryId" });

export default Blog;
