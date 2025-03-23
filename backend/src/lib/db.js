import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MongoDb = process.env.MONGO_DB;

export const ConnectedDb = async () => {
    try {
        await mongoose.connect(MongoDb);
        console.log(`Database Connected to ${MongoDb}`);
        
    } catch (e) {
        console.error;
        console.log(`Error Happened in Connecting Database ${e}`)
    }
}
