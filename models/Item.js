import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  imageUrl: String,

  // 🔹 Type of item: "lost" or "found"
  type: {
    type: String,
    enum: ["lost", "found"],
    required: true,
  },

  // 🔹 Lifecycle status: controls item progress
  status: {
    type: String,
    enum: ["submitted", "under_review", "approved", "claimed", "rejected"],
    default: "submitted",
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // 🔹 Submission & claim tracking
  ownerEmail: { type: String },
  claimedBy: { type: String, default: "" },

  // 🔹 Faculty review flag
  approved: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },

  // 🔹 Expiration date set to 30 days from creation
  expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
});

// ✅ TTL index for automatic deletion after `expiresAt`
ItemSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Item", ItemSchema);
