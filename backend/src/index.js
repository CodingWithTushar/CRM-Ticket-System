import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors);

const Port = process.env.PORT

app.post("/signup", (req, res) => {
  const { fullName, email, password } = req.body;
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
});

app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`)
});
