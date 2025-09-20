import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import routes
import authRoutes from "./routes/auth.js";
import activityRoutes from "./routes/activityRoutes.js"
import productionRoutes from "./routes/productionRoutes.js"
import salesRoutes from "./routes/salesRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/productions", productionRoutes);
app.use("/api/sales", salesRoutes)

// health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
     status: "OK", 
     timestamp: new Date().toISOString(),
     message: "SisalTrack Pro API is running" })
})
app.listen(PORT, () => {
    console.log(`🚀 SisalTrack Pro API server running on port ${PORT}`)
    console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`)
  })
  