// routes/salesRoutes.js
import express from "express";
import { addSale, getAllSales, removeSale } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addSale);
router.get("/", authMiddleware, getAllSales);
router.delete("/:id", authMiddleware, removeSale);

export default router;
