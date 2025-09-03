import pool from "../config/database.js";

export const findUserByUsernameOrEmail = async (username, email) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    return result.rows[0]; 
  };

export const findUserByUsername = async (username) => {
    const result = await pool.query("SELECT id, username, password_hash, full_name FROM users WHERE username = $1", [username]);

    return result.rows[0];
}

// Insert new user
export const createUser = async ({ username, email, passwordHash, full_name }) => {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, full_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, full_name, created_at`,
      [username, email, passwordHash, full_name]
    );
    return result.rows[0];
};

