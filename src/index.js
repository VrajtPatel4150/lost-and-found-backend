import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js"; // ✅ Import database connection
import authRoutes from "../routes/authroutes.js"; // ✅ Ensure correct filename case
import itemRoutes from "../routes/itemRoutes.js";
import app from "./server.js"; // ✅ Import pre-configured Express app



dotenv.config();  // Load environment variables

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Lost & Found API is running...");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
