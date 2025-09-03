import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwt_SECRET = process.env.JWT_SECRET || "sisal_farm_secret_key_2025"
const DEFAULT_EXPIRATION = "24h"

//sign a token
export const signToken = (user) => {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    return jwt.sign(payload, jwt_SECRET, { expiresIn: DEFAULT_EXPIRATION });
};