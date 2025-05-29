// src/routes.js
import express from "express";
import authRoutes from "../routes/authroutes.js";
import itemRoutes from "../routes/itemRoutes.js";
import claimRoutes from "../routes/claimRoutes.js";

const router = express.Router();

// Route Mounting
router.use("/auth", authRoutes);
router.use("/items", itemRoutes);
router.use("/claims", claimRoutes);


export default router;
