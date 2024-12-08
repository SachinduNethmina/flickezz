import { Op, Sequelize } from "sequelize";
import Movie from "../models/Movie.js";
import Torrent from "../models/Torrent.js";
import WebTorrent from "webtorrent";
import fs from "fs";
import path from "path";

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

export const getSubtitles = async (req, res) => {
  const { id } = req.params;
  console.log("ok");

  try {
    // Find torrent details (e.g., magnet link)
    const torrent = await Torrent.findByPk(id);

    if (!torrent) {
      return res
        .status(404)
        .json({ status: false, message: "Torrent not found" });
    }

    const client = new WebTorrent({
      maxWebConns: 10,
    });
    const magnetLink = `magnet:?xt=urn:btih:${torrent.hash}`;

    client.add(magnetLink, (torrent) => {
      console.log("Loading file");
      // Find subtitle files (e.g., srt, vtt)
      const subtitleFiles = torrent.files.filter((file) =>
        file.name.match(/\.(srt|vtt)$/i)
      );

      // Send subtitles to frontend
      const subtitleUrls = subtitleFiles.map((file) => ({
        name: file.name,
        url: `/subtitles/${file.name}`, // Adjust this path as needed for your server
      }));

      return res.json({
        videoUrl: `/stream/${id}`,
        subtitles: subtitleUrls,
      });
    });

    // Handle any errors in the client
    client.on("error", (err) => {
      console.error("Client error:", err);
      res.status(500).send("Error processing torrent.");
      client.destroy();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const streamVideo = async (req, res) => {
  const { id } = req.params;

  try {
    // Find torrent details (e.g., magnet link)
    const torrent = await Torrent.findByPk(id);

    if (!torrent) {
      return res
        .status(404)
        .json({ status: false, message: "Torrent not found" });
    }

    const client = new WebTorrent({
      maxWebConns: 10,
    });
    const magnetLink = `magnet:?xt=urn:btih:${torrent.hash}`;

    client.add(magnetLink, (torrent) => {
      const videoFile = torrent.files.find((file) =>
        file.name.match(/\.(mp4|mkv|webm|avi)$/i)
      );

      if (!videoFile) {
        res.status(404).send("No video file found in this torrent.");
        client.destroy();
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

      // Pre-buffer data
      const bufferSize = 10 * 1024 * 1024; // Buffer 10MB ahead
      const bufferEnd = Math.min(end + bufferSize, fileSize - 1);

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4", // Adjust depending on the video format
      });

      const stream = videoFile.createReadStream({ start, end });

      // Pipe the video stream to the response
      stream.pipe(res);

      stream.on("end", () => {
        console.log("Finished streaming range:", start, end);

        try {
          cleanUpTempFiles(torrent.name);
        } catch (error) {
          console.log("Temp files clear error", error);
        }
      });

      stream.on("error", (err) => {
        console.error("Stream error:", err);
        res.end();
      });

      // Handle the client disconnection or response closure
      res.on("close", () => {
        console.log("Stream cleaned");

        stream.destroy();
        client.destroy();

        try {
          cleanUpTempFiles(torrent.name);
        } catch (error) {
          console.log("Temp files clear error", error);
        }
      });
    });

    // Handle any errors in the client
    client.on("error", (err) => {
      console.error("Client error:", err);
      res.status(500).send("Error processing torrent.");
      client.destroy();
    });
  } catch (error) {
    console.error("Error in streamVideo:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const downloadVideo = async (req, res) => {
  const { id } = req.params;

  try {
    // Find torrent details (e.g., magnet link)
    const torrent = await Torrent.findByPk(id);

    if (!torrent) {
      return res
        .status(404)
        .json({ status: false, message: "Torrent not found" });
    }

    const client = new WebTorrent({
      maxWebConns: 10, // Limit simultaneous peer connections
    });
    const magnetLink = `magnet:?xt=urn:btih:${torrent.hash}`;

    client.add(magnetLink, (torrent) => {

      const videoFile = torrent.files.find((file) =>
        file.name.match(/\.(mp4|mkv|webm|avi)$/i)
      );

      if (!videoFile) {
        res.status(404).send("No video file found in this torrent.");
        try {
          client.destroy();
        } catch (error) {
          console.log("Client distroyed error", error);
        }
        return;
      }

      console.log("Downloading file:", videoFile.name);

      // Set response headers to indicate a file download
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${videoFile.name}"`
      );
      res.setHeader("Content-Type", "application/octet-stream");

      // Create a read stream for the file
      const stream = videoFile.createReadStream();

      // Pipe the file data directly to the client
      stream.pipe(res);

      stream.on("data", (chunk) => {
        console.log(`Streaming chunk of size: ${chunk.length} bytes`);
      });

      stream.on("end", () => {
        console.log("File streaming complete.");
        try {
          client.destroy();
        } catch (error) {
          console.log("Client distroyed error", error);
        } // Destroy the torrent client after streaming
        try {
          cleanUpTempFiles(torrent.name);
        } catch (error) {
          console.log("Temp files clear error", error);
        }
      });

      stream.on("error", (err) => {
        console.error("Error during streaming:", err);
        res.status(500).send("Error downloading file.");
        try {
          client.destroy();
        } catch (error) {
          console.log("Client distroyed error", error);
        }
      });

      // Clean up if the client disconnects
      res.on("close", () => {
        console.log("Client disconnected.");
        try {
          stream.destroy();
          try {
            client.destroy();
          } catch (error) {
            console.log("Client distroyed error", error);
          }
        } catch (error) {
          console.log(error);
        }

        try {
          cleanUpTempFiles(torrent.name);
        } catch (error) {
          console.log("Temp files clear error", error);
        }
      });
    });

    // Handle errors in the torrent client
    client.on("error", (err) => {
      console.error("Torrent client error:", err);
      res.status(500).send("Error processing torrent.");
      try {
        client.destroy();
      } catch (error) {
        console.log("Client distroyed error", error);
      }
    });
  } catch (error) {
    console.error("Error in downloadVideo:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const cleanUpTempFiles = (torrentName) => {
  const tmpDir = "/tmp/webtorrent/"; // Directory where torrent files are stored

  fs.readdir(tmpDir, (err, files) => {
    if (err) {
      console.error("Error reading /tmp directory:", err);
      return;
    }

    // Iterate over each file in the directory
    files.forEach((file) => {
      const filePath = path.join(tmpDir, file);

      // Check if the directory name matches the torrent name
      if (file.includes(torrentName)) {
        // You can use a partial name or a full match here
        fs.lstat(filePath, (err, stats) => {
          if (err) {
            console.error("Error checking file stats:", filePath, err);
            return;
          }

          if (stats.isDirectory()) {
            // If it's a directory, remove it recursively
            fs.rm(filePath, { recursive: true, force: true }, (err) => {
              if (err) {
                console.error("Error removing directory:", filePath, err);
              } else {
                console.log("Deleted directory:", filePath);
              }
            });
          }
        });
      }
    });
  });
};
