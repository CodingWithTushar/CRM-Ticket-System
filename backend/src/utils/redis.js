import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient(process.env.REDIS_URL);
await client.connect().catch(console.error)


client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});


export const setJWT = async (key, value) => {
  try {
   
    if (!client.isReady) {
      await client.connect()
    };
    
    await client.set(key, value);
    console.log("JWT stored successfully")
  } catch (err) {
    console.error("Error setting JWT:", err);
    throw err; 
  }
};

export const getJWT = async (key) => {
  try {
    if (!client.isReady) await client.connect();
    
    const value = await client.get(key);
    console.log(value)
  } catch (err) {
    console.error("Error getting JWT:", err);
    throw err;
  }
};