import express from "express";
import {
  login,
  refreshSession,
  register,
} from "../controllers/AuthController.js";
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-logged-user", UserAuthMiddleware, refreshSession);

export default router;
