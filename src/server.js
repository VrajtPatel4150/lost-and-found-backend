import express from "express";
import cors from "cors";
import routes from "./routes.js"; // Import centralized routes
import uploadRoutes from "../routes/uploadRoutes.js";
import userRoutes from "../routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Use Routes
app.use("/api", routes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);


export default app;
