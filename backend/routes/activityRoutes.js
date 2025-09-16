import express from "express";
import { createActivity, getUserActivities,updateActivity, deleteActivity } from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/",authMiddleware, createActivity);
router.get("/", authMiddleware, getUserActivities);
router.put("/:id", authMiddleware, updateActivity);
router.delete("/:id", authMiddleware, deleteActivity)

export default router