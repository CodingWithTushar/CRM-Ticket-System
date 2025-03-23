import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser"; 
import { TicketRouter } from "./routes/ticketrouter.js";
import { handleError } from "./utils/errorHandler.js";
import { ConnectedDb } from "./lib/db.js";
import { UserRouter } from "./routes/userrouter.js";

dotenv.config();
const app = express();
const Port = process.env.PORT;
const MongoDb = process.env.MONGO_DB;

mongoose.connect(MongoDb);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
  ConnectedDb();
}
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
