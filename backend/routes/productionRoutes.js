import express from "express";
import { addProduction, getAllProductions, removeProduction } from "../controllers/productionController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addProduction);
router.get("/", authMiddleware, getAllProductions);
router.delete("/:id", authMiddleware, removeProduction);

export default router;
