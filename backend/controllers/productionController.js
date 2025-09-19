import { createProduction, deleteProduction, getProductions } from "../services/productionService.js"

export const addProduction = async (req, res) => {
    try{
        const userId = req.user.userId;
        const newProduction = await createProduction(userId, req.body);
        res.status(201).json({ message: "Production recorded", production: newProduction });
    } catch (err) {
        console.error("Error creating production:", err);
        res.status(500).json({ message: "Server error while creating production" });
    }
}

export const getAllProductions = async (req, res) => {
    try {
        const userId = req.user.userId
        const productions = await getProductions(userId);
        res.json({ productions });
    } catch (err) {
        console.error("Error fetching productions:", err);
        res.status(500).json({ message: "Server error while fetching productions" });
    }
};

export const removeProduction = async (req, res) => {
    try {
        const userId = req.user.userId
        const deleted = await deleteProduction(userId, req.params.id);
        if (!deleted) {
        return res.status(404).json({ message: "Production not found" });
      }
      res.json({ message: "Production deleted", production: deleted });
    } catch (err) {
      console.error("Error deleting production:", err);
      res.status(500).json({ message: "Server error while deleting production" });
    }
};