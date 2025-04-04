import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { TicketRouter } from "./routes/ticketrouter.js";
import { handleError } from "./utils/errorHandler.js";
import { ConnectedDb } from "./lib/db.js";
import { UserRouter } from "./routes/userrouter.js";
import path from "path";

dotenv.config();
const app = express();
const Port = process.env.PORT || 3001;
const MongoDb = process.env.MONGO_DB;
const __dirname = path.resolve(); 

mongoose.connect(MongoDb);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
  ConnectedDb();
}

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser())

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*" , (req , res) => {
    res.sendFile(path.join(__dirname, "../frontend" , "dist" , "index.html`"))
  })
}

app.use("/api/v1/user",UserRouter );
app.use("/api/v1/ticket", TicketRouter);

app.use((req, res, next) => {
  const error = new Error("Resources  not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
  next();
});

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
