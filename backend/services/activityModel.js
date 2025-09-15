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