// backend/utils/s3Config.js
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,       // 🔥 Get from your .env file
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 🔥 Get from your .env file
  region: process.env.AWS_REGION,                    // 🔥 e.g., ap-southeast-2
});

export default s3;
