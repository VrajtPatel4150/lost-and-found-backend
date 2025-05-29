import express from "express";
import cors from "cors";
import routes from "./routes.js";
import uploadRoutes from "../routes/uploadRoutes.js";
import userRoutes from "../routes/userRoutes.js";

const app = express();
app.use(express.json());

// ✅ Replace this with your **actual deployed frontend domain** (no typos)
app.use(
  cors({
    origin: [
      "https://lost-and-found-frontend-orpin.vercel.app/",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api", routes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

export default app;
