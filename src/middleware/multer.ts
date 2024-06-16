import multer from "multer";
import { RequestHandler } from "express";

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Corrected path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Export a single upload middleware for photo field
export const singleUpload: RequestHandler = upload.single("photo");
