import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./config/db.js";
import { syncDb } from "./config/syncDb.js";

import MovieRoute from "./routes/MoviesRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST"],
    origin: [process.env.ORIGIN1],
  })
);

app.use("/api/movies/", MovieRoute);

app.listen(port, async () => {
  console.log("Server running on port", port);
  await dbConnect();
  await syncDb();
});
