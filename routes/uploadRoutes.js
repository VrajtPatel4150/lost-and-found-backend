import express from "express";
import multer from "multer";
import s3 from "../utils/s3Config.js";

const router = express.Router();

// Use multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `lost-found/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const data = await s3.upload(params).promise();
    res.status(200).json({ imageUrl: data.Location }); // Return the S3 public URL
  } catch (err) {
    console.error("S3 Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err });
  }
});

export default router;
