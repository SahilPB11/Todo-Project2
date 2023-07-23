import express from "express";
import {
  getAllUser,
  getMyProfile,
  register,
  login,
  logout,
} from "../controlers/userFun.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUser);

router.post("/new", register);

router.get("/me", isAuthenticated, getMyProfile);

router.post("/login", login);

router.get("/logout", logout);

export default router;
