import mongoose from "mongoose";
import config from "../config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    console.log("Connected to DataBase");
  } catch (error) {
    console.log("Failed to connect to DB", error);
    process.exit(1);
  }
};
