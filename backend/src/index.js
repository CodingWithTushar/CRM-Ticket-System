import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { TicketRouter } from "./routes/ticketrouter.js";
import { handleError } from "./utils/errorHandler.js";
import { UserRouter } from "./routes/userrouter.js";
import path from "path";

dotenv.config();
const app = express();
const Port = process.env.PORT || 3001;
const MongoDb = process.env.MONGO_DB;
const __dirname = path.resolve(); 
app.use(express.json());

mongoose.connect(MongoDb);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
const MongoDb = process.env.MONGO_DB;
    try {
        await mongoose.connect(MongoDb);
        console.log(`Database Connected to ${MongoDb}`);
        
    } catch (e) {
        console.error;
        console.log(`Error Happened in Connecting Database ${e}`)
    }
}



const allowedOrigin = process.env.NODE_ENV === 'production'
? "https://resolve360.onrender.com"
: "http://localhost:5173";

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(cookieParser())

app.use("/api/v1/ticket", TicketRouter);
app.use("/api/v1/user",UserRouter );
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  app.get("*" , (req , res) => {
    res.sendFile(path.join(__dirname, "../frontend" , "dist" , "index.html"))
  })
}




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
