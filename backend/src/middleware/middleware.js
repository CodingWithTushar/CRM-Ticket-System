import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../model/user.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protectRouter = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decodedtoken = await jwt.verify(token, JWT_SECRET);
    if (!decodedtoken) {
      res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await UserModel.findById(decodedtoken.userId.trim()).select(
      "-password"
    );

    console.log(user);

    if (!user) {
      res.status(404).json({
        message: "User Not Found In Middleware",
      });
    }
    req.user = user;  

    next();
  } catch (e) {
    res.status(403).json({
      message: `Error Happened in Middleware ${e}`,
    });
  }
};
