import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["USER", "ADMIN"],
      defaultValue: "USER",
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true }
);

export default User;
