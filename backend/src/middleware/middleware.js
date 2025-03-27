import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../model/user.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function protectRouter(req, res, next) {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decodedtoken = await jwt.verify(token, JWT_SECRET);

    if (!decodedtoken) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await UserModel.findById(decodedtoken.userId).select(
      "-password"
    );

    console.log(user)

    if (!user) {
      return res.status(404).json({
        message: "User Not Found In Middleware",
      });
    }
    req.user = user;

    next();
  } catch (e) {
    console.error;
    console.log(`Error Happened in Middleware ${e}`);
    res.status(403).json({
      message: "forbidden",
    });
  }
}
