// services/salesService.js
import pool from "../config/database.js";

// Create Sale
export const createSale = async (userId, saleData) => {
  const { saleDate, buyerName, product, quantity, unitPrice, saleNotes } = saleData;

  try {
    const insertQuery = `
      INSERT INTO sales 
        (user_id, sale_date, customer_name, product, quantity, unit_price, sale_notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        id, sale_date AS "saleDate", customer_name AS "buyerName",
        product AS "fibreGrade", quantity AS "numberOfBales",
        unit_price AS "pricePerTon", sale_notes AS "notes"
    `;
    const { rows } = await pool.query(insertQuery, [
      userId,
      saleDate,
      buyerName,
      product,
      quantity,
      unitPrice,
      saleNotes
    ]);

    return rows[0];
  } catch (err) {
    console.error(err);
    throw new Error("Error creating sale");
  }
};

// Get Sales
export const getSales = async (userId) => {
  const { rows } = await pool.query(
    `SELECT 
       id, sale_date AS "saleDate", customer_name AS "buyerName", 
       product AS "fibreGrade", quantity AS "numberOfBales",
       unit_price AS "pricePerTon", sale_notes AS "notes"
     FROM sales
     WHERE user_id = $1
     ORDER BY sale_date DESC`,
    [userId]
  );
  return rows;
};

// Delete Sale
export const deleteSale = async (userId, saleId) => {
  const result = await pool.query(
    `DELETE FROM sales WHERE id = $1 AND user_id = $2 RETURNING *`,
    [saleId, userId]
  );
  return result.rows[0];
};
