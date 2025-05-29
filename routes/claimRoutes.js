import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ClaimLog from "../models/ClaimLog.js"; 

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/", async (req, res) => {
  const { ownerEmail, itemName, claimerEmail } = req.body;

  if (!ownerEmail || !itemName || !claimerEmail) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ownerEmail,
    subject: `Claim Request for "${itemName}"`,
    text: `${claimerEmail} believes they own the item "${itemName}". Please contact them to confirm.`
  };


  try {
    await transporter.sendMail(mailOptions);

    await ClaimLog.create({
      itemName,
      ownerEmail,
      claimerEmail,
    });

    res.status(200).json({ message: "Email sent and claim logged" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Error sending email", error: err });
  }
});
router.get("/logs", async (_req, res) => {
  try {
    const logs = await ClaimLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});


export default router;
