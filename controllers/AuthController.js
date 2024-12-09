import User from "../models/User.js";
import { comparePassword, hashPassowrd } from "../utils/bcryptUtil.js";
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtUtil.js";
import logger from "../utils/Logger.js";

export const register = async (req, res) => {
  try {
    const data = req.body;

    const exitU = await User.findOne({ where: { email: data.email } });
    if (exitU)
      return res
        .status(400)
        .json({ status: false, message: "This email allready registered" });

    const user = await User.create({
      ...data,
      password: hashPassowrd(data.password),
    });

    return res.json({ status: true, message: "User register success" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });

    if (!comparePassword(password, user.password))
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });

    const u = {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
    };

    const accessToken = generateAccessToken(u);
    const refreshToken = generateRefreshToken(u);
    const exp = decodeToken(accessToken).exp;

    return res.json({
      status: true,
      message: "Login success",
      user: u,
      accessToken,
      refreshToken,
      exp,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};

export const refreshSession = async (req, res) => {
  try {
    const u = req.user;

    const accessToken = generateAccessToken(u);
    const refreshToken = generateRefreshToken(u);
    const exp = decodeToken(accessToken).exp;

    return res.json({
      status: true,
      user: u,
      accessToken,
      refreshToken,
      exp,
    });
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ status: false, message: "Unauthorize" });
  }
};
