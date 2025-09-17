-- Create database and tables for SisalTrack Pro
CREATE DATABASE IF NOT EXISTS sisal_project_farm_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Activity table
CREATE TABLE IF NOT EXISTS  activities (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('pre-planting','planting','maintenance','harvesting','processing')),
    description TEXT,
    duration INT NOT NULL CHECK (duration > 0),
    number_of_workers INT NOT NULL CHECK (number_of_workers > 0),
    money_spent DECIMAL(12,2) DEFAULT 0 CHECK (money_spent >= 0),
    area_covered DECIMAL(10,2) DEFAULT 0 CHECK (area_covered >= 0),
    supervisor_name VARCHAR(255) NOT NULL,
    date_performed DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Productions table
CREATE TABLE IF NOT EXISTS productions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    production_date DATE NOT NULL,
    farm_name VARCHAR(255) NOT NULL,
    supervisor_name VARCHAR(255) NOT NULL,
    production_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Graded output table
CREATE TABLE IF NOT EXISTS graded_outputs (
    id SERIAL PRIMARY KEY,
    production_id INT NOT NULL REFERENCES productions(id) ON DELETE CASCADE,
    grade VARCHAR(50) NOT NULL,
    bale_weight NUMERIC(10,2) NOT NULL,
    number_of_bales INT NOT NULL
);




-- version2 down

-- Harvesting Details table
-- CREATE TABLE harvesting_details (
--     id SERIAL PRIMARY KEY,
--     activity_id INT REFERENCES activities(id) ON DELETE CASCADE,
-- );





-- CREATE TABLE sales (
--     id SERIAL PRIMARY KEY,
--     farm_id INT REFERENCES farms(id) ON DELETE SET NULL,
--     user_id INT REFERENCES users(id) ON DELETE SET NULL,         -- mtu aliyerekodi sale
--     activity_id INT REFERENCES activities(id) ON DELETE SET NULL, -- optional, inaweza ku-link na harvesting
--     quantity NUMERIC(12,2) NOT NULL,      -- kilo za sisal au units
--     unit_price DECIMAL(12,2) NOT NULL,
--     total_amount DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
--     buyer_name VARCHAR(100),
--     sale_date DATE DEFAULT CURRENT_DATE,
--     description TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

