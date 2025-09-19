import pool from "../config/database.js";

// create production and graded output
export const createProduction = async (userId, productionData) => {
    const { productionDate, farmName, supervisorName, productionNotes, gradedOutput } = productionData;
  
    try {
      // 1️⃣ Insert into productions
      const insertProdQuery = `
        INSERT INTO productions (user_id, production_date, farm_name, supervisor_name, production_notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      const { rows: prodRows } = await pool.query(insertProdQuery, [
        userId,
        productionDate,
        farmName,
        supervisorName,
        productionNotes
      ]);
  
      const productionId = prodRows[0].id;
  
      // 2️⃣ Insert graded outputs
      const insertGradeQuery = `
        INSERT INTO graded_outputs (production_id, grade, bale_weight, number_of_bales)
        VALUES ($1, $2, $3, $4)
      `;
  
      for (const grade of gradedOutput) {
        await pool.query(insertGradeQuery, [
          productionId,
          grade.grade,
          grade.baleWeight,
          grade.numberOfBales
        ]);
      }
  
      // 3️⃣ Fetch full production with graded outputs
      const { rows } = await pool.query(
        `SELECT 
            p.id, 
            p.production_date AS "productionDate", 
            p.farm_name AS "farmName", 
            p.supervisor_name AS "supervisorName", 
            p.production_notes AS "productionNotes",
            COALESCE(
                json_agg(
                json_build_object(
                    'id', g.id,
                    'grade', g.grade,
                    'baleWeight', g.bale_weight,
                    'numberOfBales', g.number_of_bales
                )
                ) FILTER (WHERE g.id IS NOT NULL), '[]'
            ) AS "gradedOutput"
            FROM productions p
            LEFT JOIN graded_outputs g ON p.id = g.production_id
            WHERE p.user_id = $1
            GROUP BY p.id
            ORDER BY p.production_date DESC;
            `,
        [productionId]
      );
  
      return rows[0]; // includes gradedoutput
    } catch (err) {
      console.error(err);
      throw new Error("Error creating production");
    }
  };

// Fetch all productions
export const getProductions = async (userId) => {
    const { rows } = await pool.query(`SELECT 
  p.id,
  p.production_date AS "productionDate",
  p.farm_name AS "farmName",
  p.supervisor_name AS "supervisorName",
  p.production_notes AS "productionNotes",
  COALESCE(
    json_agg(
      json_build_object(
        'id', g.id,
        'grade', g.grade,
        'baleWeight', g.bale_weight,
        'numberOfBales', g.number_of_bales
      )
    ) FILTER (WHERE g.id IS NOT NULL), '[]'
  ) AS "gradedOutput"
FROM productions p
LEFT JOIN graded_outputs g ON p.id = g.production_id
WHERE p.user_id = $1
GROUP BY p.id
ORDER BY p.production_date DESC;
`,
        [userId]
    );
    
    return rows;
}


// Delete production
export const deleteProduction = async (userId, productionId) => {
    const result = await pool.query(
      `DELETE FROM productions WHERE id = $1 AND user_id = $2 RETURNING *`,
      [productionId, userId]
    );
    return result.rows[0]; // null if nothing deleted
};
  

// Delete all production