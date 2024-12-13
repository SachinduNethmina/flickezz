import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Blog from "./Blog.js";

const Comment = sequelize.define(
  "Comment",
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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true }
);

Blog.hasMany(Comment, { foreignKey: "blogId" });
Comment.belongsTo(Blog, { foreignKey: "blogId" });

export default Comment;
