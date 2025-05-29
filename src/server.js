import express from "express";
import cors from "cors";
import routes from "./routes.js";
import uploadRoutes from "../routes/uploadRoutes.js";
import userRoutes from "../routes/userRoutes.js";

const app = express();
app.use(express.json());

// ✅ CORS: allow specific origins
const allowedOrigins = [
  "https://lost-and-found-frontend-j8ey7408f-vraj-patels-projects-48ab6a52.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// ✅ Mount all grouped routes
app.use("/api", routes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

export default app;
