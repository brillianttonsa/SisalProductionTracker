import express from "express";
import { createActivity, getUserActivities } from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/",authMiddleware, createActivity);
router.get("/", authMiddleware, getUserActivities);

export default router