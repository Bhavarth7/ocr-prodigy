import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoute from "./route/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import Info from "./db/schema.js";
import { ocrData } from "./ocr.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));

// API routes
app.use("/api/users", usersRoute);

// Database connection setup
const db = "mongodb://localhost:27017/OCR";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`);
  });

// Event listener for database disconnection
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from the database");
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route to handle file upload and perform OCR data extraction
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const path = req.file.destination + "/" + req.file.filename;
    const data = await ocrData(path);

    // Create a new entry in the database with extracted OCR data
    const newInfo = await Info.create({
      image: req.file.filename,
      identificationNumber: data.identificationNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      dateOfExpiry: data.dateOfExpiry,
      dateOfIssue: data.dateOfIssue,
    });

    res.json(newInfo); // Respond with the created entry
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Default route
app.use("/", (req, res) => {
  return res.send("OCR-App backend");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
