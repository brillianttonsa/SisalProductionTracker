// controllers/salesController.js
import { createSale, getSales, deleteSale } from "../services/salesService.js";

// Add a sale
export const addSale = async (req, res) => {
  try {
    const userId = req.user.userId; // from auth middleware

    // Map frontend fields to DB columns
    const saleData = {
      saleDate: req.body.saleDate,
      buyerName: req.body.buyerName,
      product: req.body.fibreGrade,       // frontend "fibreGrade" -> DB "product"
      quantity: Number(req.body.numberOfBales),
      unitPrice: Number(req.body.pricePerTon),
      saleNotes: req.body.notes || "",    // optional
    };

    const newSale = await createSale(userId, saleData);
    res.status(201).json({ message: "Sale recorded", sale: newSale });
  } catch (err) {
    console.error("Error creating sale:", err);
    res.status(500).json({ message: "Server error while creating sale" });
  }
};

// Get all sales for logged in user
export const getAllSales = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sales = await getSales(userId);
    res.json({ sales });
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ message: "Server error while fetching sales" });
  }
};

// Delete a sale
export const removeSale = async (req, res) => {
  try {
    const userId = req.user.userId;
    const deleted = await deleteSale(userId, req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json({ message: "Sale deleted", sale: deleted });
  } catch (err) {
    console.error("Error deleting sale:", err);
    res.status(500).json({ message: "Server error while deleting sale" });
  }
};
