import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP;
const REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP;

export const generateAccessToken = (user) => {
  return jwt.sign({ user, refresh: false }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXP,
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ user, refresh: true }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXP,
  });
};

export const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
