import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generatetoken = async (userId, res) => {
  try {
    const token = await jwt.sign({ userId }, JWT_SECRET, { expiresIn: "3h" });

    console.log(token);
  } catch (e) {
    console.log(`Error Happened In Generating the token ${e}`);
  }
};
