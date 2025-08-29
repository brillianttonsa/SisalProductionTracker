import pool from "../config/database";

export const findUserByUsernameOrEmail = async (username, email) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    return result.rows[0]; 
  };

export const findUserByUsername = async (username) => {
    const result = await pool.query("SELECT id, username, password_hash, role, full_name FROM users WHERE username = $1", [username]);

    return result.rows[0];
}

// Insert new user
export const createUser = async ({ username, email, password_hash, role, full_name, phone }) => {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, role, full_name, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, role, full_name, created_at`,
      [username, email, password_hash, role, full_name, phone]
    );
    return result.rows[0];
};

