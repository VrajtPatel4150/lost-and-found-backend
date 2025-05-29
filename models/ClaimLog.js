// models/ClaimLog.js
import mongoose from "mongoose";

const ClaimLogSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  claimerEmail: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("ClaimLog", ClaimLogSchema);
