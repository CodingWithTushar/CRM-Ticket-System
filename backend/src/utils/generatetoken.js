import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generatetoken = async (userId, res) => {
  try {
    const token = await jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict", 
    secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (e) {
    console.log(`Error Happened In Generating the token ${e}`);
  }
};
