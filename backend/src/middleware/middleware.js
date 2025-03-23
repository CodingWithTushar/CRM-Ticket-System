import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

function protectRouter (token ,next) {
    try {
        const decodedtoken = jwt.verify(token , JWT_SECRET)
        next()
    } catch (e) {
        console.error;
        console.log(`Error Happened in Middleware ${e}`)
    }
}