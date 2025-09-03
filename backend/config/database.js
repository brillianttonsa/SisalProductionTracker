import pkg from "pg"
import dotenv from "dotenv"

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "sisal_farm_db",
    password: process.env.DB_PASSWORD || "password",
    port: process.env.DB_PORT || 5432,
})

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
})

pool.on("error", (err) => {
  console.log("Database connection error:", err);
})
  


export default pool;