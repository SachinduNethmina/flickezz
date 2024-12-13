import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const AdminAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return sendError(res);
    const token =
      authHeader.split(" ").length > 0 ? authHeader.split(" ")[1] : null;
    if (!token) return sendError(res);

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.user) return sendError(res);

    const user = await User.findOne({
      where: {
        id: decoded.user.id,
        role: "ADMIN",
      },
    });
    if (!user) return sendError(res);

    const u = {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
    };

    req.user = u;

    next();
  } catch (error) {
    return sendError(res);
  }
};

const sendError = (res) => {
  return res.status(401).json({ message: "Unauthorize", status: false });
};
