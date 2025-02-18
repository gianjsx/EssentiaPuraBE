import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 3000,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  DB_URI: process.env.DB_URI,
};
