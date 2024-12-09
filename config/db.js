import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/Logger.js";
dotenv.config();

export const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    logging: false, // Disable Sequelize logging
  }
);

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connect success");
  } catch (error) {
    logger.info("Database error", error);
  }
};
