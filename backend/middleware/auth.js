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

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, jwt_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};


