// Import necessary modules with their types
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// Configuration
dotenv.config({
  path: "./.env",
});

// Ensure environment variables exist
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Cloudinary environment variables are missing.");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Define types
type File = string; // Assuming File is a string path

// Upload function
export const uploadOnCloud = async (
  localfile: File
): Promise<UploadApiResponse | null> => {
  try {
    if (!localfile) return null;
    const response = await cloudinary.uploader.upload(localfile, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    // Handle error, and ensure local file cleanup
    if (fs.existsSync(localfile)) {
      fs.unlinkSync(localfile);
    }
    return null;
  }
};
