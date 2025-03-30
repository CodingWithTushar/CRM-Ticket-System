import express from "express";
import {
  getUsers,
  login,
  logout,
  signup,
} from "../controllers/authcontroller.js";
import { protectRouter } from "../middleware/middleware.js";

export const UserRouter = express.Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);
UserRouter.get("/user", protectRouter, getUsers);
UserRouter.post("/logout", logout);
