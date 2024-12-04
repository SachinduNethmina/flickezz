import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Movie from "./Movie.js";

const Torrent = sequelize.define(
  "Torrent",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    movieId: {
      type: DataTypes.BIGINT,
      references: {
        model: Movie,
        key: "id",
      },
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seeds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    peers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true }
);

Movie.hasMany(Torrent, { foreignKey: "movieId" });
Torrent.belongsTo(Movie, { foreignKey: "movieId" });

export default Torrent;
