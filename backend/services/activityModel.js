import pool from "../config/database.js";

export const createNewActivity = async (userId, activityData) => {
    const { farm_name, activity_type, description, duration, number_of_workers, money_spent, area_covered, supervisor_name, date_performed } = activityData;

    const result = await pool.query(
        `INSERT INTO activities 
          (user_id, farm_name, activity_type, description, duration, number_of_workers, money_spent, area_covered, supervisor_name, date_performed) 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING *`,
        [
          userId,
          farm_name,
          activity_type,
          description,
          duration,
          number_of_workers,
          money_spent,
          area_covered,
          supervisor_name,
          date_performed,
        ]
    );
    return result.rows[0]; 
};

export const getUserActivitiesFromDB = async (userId) => {
    const result = await pool.query(
      `SELECT * FROM activities WHERE user_id = $1 ORDER BY date_performed DESC`,
      [userId]
    );
    return result.rows;
};

export const updateActivityDB = async (id, userId, updates) => {
    const {
      farm_name,
      activity_type,
      description,
      supervisor_name,
      area_covered,
      money_spent,
      duration,
      number_of_workers,
      date_performed
    } = updates;
    
    const query = `
      UPDATE activities
      SET farm_name = $1,
          activity_type = $2,
          description = $3,
          supervisor_name = $4,
          area_covered = $5,
          money_spent = $6,
          duration = $7,
          number_of_workers = $8,
          date_performed = $9
      WHERE id = $10 AND user_id = $11
      RETURNING *;
    `;

    const values = [
      farm_name,
      activity_type,
      description,
      supervisor_name,
      area_covered,
      money_spent,
      duration,
      number_of_workers,
      date_performed,
      id,
      userId
    ];


    try {
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("DB update error:", error);;
      return null;
    }

}

export const deleteActivityFromDB = async (id) => {
  const result = await pool.query(
    `DELETE FROM activities WHERE id = $1 RETURNING *`,
    [id]
  );
  return result;
}