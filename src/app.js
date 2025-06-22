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
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Dynamically allow any origin
    }, // Allow only these origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies/tokens
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
