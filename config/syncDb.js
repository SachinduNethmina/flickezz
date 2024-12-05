import Movie from "../models/Movie.js";
import Torrent from "../models/Torrent.js";
import User from "../models/User.js";
import { sequelize } from "./db.js";

export const syncDb = async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("Databse sync failed", error);
  }
};
