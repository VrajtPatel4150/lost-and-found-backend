import express from "express";
import cors from "cors";
import routes from "./routes.js";
import uploadRoutes from "../routes/uploadRoutes.js";
import userRoutes from "../routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://lost-and-found-deployed-frontend-pr64629et.vercel.app/', 
  credentials: true
}));

// Mount all grouped routes
app.use("/api", routes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

export default app;
