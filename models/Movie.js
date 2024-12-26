import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    scrapId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titleEnglish: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titleLong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    runtime: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    genres: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ytTrailerCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    backgroundImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    smallCoverImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mediumCoverImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    largeCoverImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateUploaded: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imdbCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true }
);

export default Movie;
