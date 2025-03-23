import express from "express";
import { login, logout, signup } from "../controllers/authcontroller.js";

export const UserRouter = express.Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);
UserRouter.post("/logout", logout);


