import dotenv from "dotenv";
dotenv.config();

const ORIGIN1 = process.env.ORIGIN1 || "https://flickezz.com";

export const VideoAuthMiddleware = async (req, res, next) => {
  try {
    const origin = req.get("Origin") || req.get("Referer");

    if (!origin || !origin.startsWith(ORIGIN1)) {
      return res
        .status(403)
        .send("Forbidden: Access from this origin is not allowed.");
    }

    next();
  } catch (error) {
    return res
      .status(403)
      .send("Forbidden: Access from this origin is not allowed.");
  }
};
