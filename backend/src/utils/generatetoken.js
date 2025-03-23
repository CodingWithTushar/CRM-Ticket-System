import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getJWT, setJWT } from "./redis.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generatetoken = async (userId, res) => {
  try {
    const token = await jwt.sign({ userId }, JWT_SECRET, { expiresIn: "3h" });

    await setJWT(token, userId)
    await getJWT(token)
  } catch (e) {
    console.log(`Error Happened In Generating the token ${e}`);
  }
};
