// routes/authroutes.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Generate token
const generateToken = (uid, role) => {
  return jwt.sign({ uid, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

router.post("/firebase-auth", async (req, res) => {
  try {
    const { uid, email, displayName, role } = req.body;

    if (!uid || !email || !role) {
      return res.status(400).json({ message: "UID, email, and role are required" });
    }

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, displayName, role });
      await user.save();
    }

    const token = generateToken(uid, user.role);
    res.json({ token, user });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Error authenticating user", error: error.message });
  }
});

// Get all users (faculty only – no auth check added yet)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete user by ID (faculty only – no auth check added yet)
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "faculty") {
      return res.status(403).json({ message: "Cannot delete faculty user" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});


export default router;
