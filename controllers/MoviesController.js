import { Op, Sequelize } from "sequelize";
import Movie from "../models/Movie.js";
import Torrent from "../models/Torrent.js";
import torrentStream from "torrent-stream";

export const getPopularMovies = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 24;
    let skip = (page ? parseInt(page) - 1 : 0) * limit;

    const count = await Movie.count({
      order: [["rating", "DESC"]],
    });

    const pages = Math.ceil(count / limit);

    const popular = await Movie.findAll({
      order: [["rating", "DESC"]],
      limit: limit,
      offset: skip,
    });

    return res.json({ status: true, popular, count, limit, pages });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const getLatestMovies = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 24;
    let skip = (page ? parseInt(page) - 1 : 0) * limit;

    const count = await Movie.count({
      order: [
        ["year", "DESC"],
        ["date_uploaded", "DESC"],
      ],
    });

    const pages = Math.ceil(count / limit);

    const latest = await Movie.findAll({
      order: [
        ["year", "DESC"],
        ["date_uploaded", "DESC"],
      ],
      limit: limit,
      offset: skip,
    });

    return res.json({ status: true, latest, count, limit, pages });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const getPopularLatestMovies = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 24;
    let skip = (page ? parseInt(page) - 1 : 0) * limit;

    const count = await Movie.count({
      order: [
        ["date_uploaded", "DESC"],
        ["rating", "DESC"],
      ],
    });

    const pages = Math.ceil(count / limit);

    const forYou = await Movie.findAll({
      order: [
        ["date_uploaded", "DESC"],
        ["rating", "DESC"],
      ],
      limit: limit,
      offset: skip,
    });

    return res.json({ status: true, forYou, count, limit, pages });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { page, search, genre } = req.query;
    const limit = 24;
    let skip = (page ? parseInt(page) - 1 : 0) * limit;

    const count = await Movie.count({
      where: {
        ...(search.trim().length > 0 && {
          [Sequelize.Op.or]: [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { titleEnglish: { [Sequelize.Op.like]: `%${search}%` } },
            { titleLong: { [Sequelize.Op.like]: `%${search}%` } },
          ],
        }),
        ...(genre.trim().length > 0 && {
          genres: { [Sequelize.Op.like]: `%${genre}%` },
        }),
      },
      order: [["date_uploaded", "DESC"]],
    });

    const pages = Math.ceil(count / limit);

    const results = await Movie.findAll({
      where: {
        ...(search.trim().length > 0 && {
          [Sequelize.Op.or]: [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { titleEnglish: { [Sequelize.Op.like]: `%${search}%` } },
            { titleLong: { [Sequelize.Op.like]: `%${search}%` } },
          ],
        }),
        ...(genre.trim().length > 0 && {
          genres: { [Sequelize.Op.like]: `%${genre}%` },
        }),
      },
      order: [["date_uploaded", "DESC"]],
      limit: limit,
      offset: skip,
    });

    return res.json({ status: true, results, count, limit, pages });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const loadMovie = async (req, res) => {
  try {
    const { slug } = req.params;

    const movie = await Movie.findOne({
      where: {
        slug,
      },
      include: {
        model: Torrent,
      },
    });

    return res.json({ status: true, movie });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const loadRecommended = async (req, res) => {
  try {
    const { genres } = req.query;
    const limit = 24;

    const genreArray = genres.split(",").map((genre) => genre.trim());

    const movies = await Movie.findAll({
      where: {
        [Op.or]: genreArray.map((genre) => ({
          genres: {
            [Op.like]: `%${genre}%`,
          },
        })),
      },
      limit: limit,
    });

    return res.json({ status: true, movies });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const streamVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const torrent = await Torrent.findByPk(id);

    if (torrent) {
      const magnetLink = `magnet:?xt=urn:btih:${torrent.hash}`;
      const engine = torrentStream(magnetLink);

      engine.on("ready", () => {
        const videoFile = engine.files.find((file) =>
          file.name.match(/\.(mp4|mkv|webm|avi)$/i)
        );

        if (!videoFile) {
          res.status(404).send("No video file found in this torrent.");
          engine.destroy();
          return;
        }

        console.log("Streaming file:", videoFile.name);

        const range = req.headers.range;
        if (!range) {
          res.status(400).send("Requires Range header");
          return;
        }

        const fileSize = videoFile.length;
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        // Ensure the range is within file bounds
        if (start >= fileSize || end >= fileSize) {
          res.status(416).send("Requested range not satisfiable");
          return;
        }

        // Dynamically set Content-Type based on the file extension
        const ext = videoFile.name.split(".").pop().toLowerCase();
        let contentType = "video/mp4"; // Default to mp4
        if (ext === "mkv") contentType = "video/x-matroska";
        if (ext === "webm") contentType = "video/webm";
        if (ext === "avi") contentType = "video/avi";

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": contentType,
        });

        const stream = videoFile.createReadStream({ start, end });
        stream.pipe(res);

        stream.on("error", (err) => {
          console.error("Stream error:", err);
          res.end();
        });

        res.on("close", () => {
          stream.destroy();
          engine.destroy();
        });
      });

      engine.on("error", (err) => {
        console.error("Engine error:", err);
        res.status(500).send("Error processing torrent.");
      });
    } else {
      return res.status(400).json({ status: false, message: "No video found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};
