import express from "express";
import Item from "../models/Item.js";

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// POST item (with approval set to false)
router.post("/", async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      approved: false, // ✅ Enforce pending approval
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

// PUT update item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Faculty approves item
router.put("/approve/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.approved = true;
    await item.save();

    res.json({ message: "Item approved" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed", error: err.message });
  }
});

// GET all claimed and approved items
router.get("/claimed", async (req, res) => {
  try {
    const items = await Item.find({ status: "claimed", approved: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch claimed items", error: err.message });
  }
});

// PUT /api/items/reject/:id
router.put("/reject/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.status = "rejected";
    item.approved = false;
    await item.save();

    res.json({ message: "Item rejected successfully" });
  } catch (err) {
    console.error("Rejection failed:", err);
    res.status(500).json({ message: "Rejection failed", error: err.message });
  }
});




export default router;
