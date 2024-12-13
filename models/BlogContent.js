import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Blog from "./Blog.js";

const BlogContent = sequelize.define(
  "BlogContent",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.BIGINT,
      references: {
        key: "id",
        model: Blog,
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
  },
  { timestamps: true, underscored: true }
);

Blog.hasMany(BlogContent, { foreignKey: "blogId" });
BlogContent.belongsTo(Blog, { foreignKey: "blogId" });

export default BlogContent;
