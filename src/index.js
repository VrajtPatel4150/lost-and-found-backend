import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js";
import app from "./server.js"; // Keep this

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Lost & Found API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
