import express from "express";
import config from "./config.js";
import morgan from "morgan";
import router from "./routes/indexRts.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//SETTING
app.set("port", config.port);

//MIDDLEWARE

// const allowedOrigins = ["https://essentiapura.xyz", "http://localhost:5173/"];
app.use(
  cors({
    origin: ["https://essentiapura.xyz", "http://localhost:5173"], // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  })
);
app.use(express.json());
app.use(morgan("short"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/"),
  filename: (req, file, fnCallback) => {
    fnCallback(
      null,
      `${new Date().getTime() + path.extname(file.originalname)}`
    );
  },
});
app.use(
  multer({
    storage,
  }).single("imagen")
);

//ROUTE
app.use("/api", router);

export default app;
