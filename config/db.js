import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connect success");
  } catch (error) {
    console.log("Database error", error);
  }
};
