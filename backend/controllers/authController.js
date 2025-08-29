import { findUserByUsername,createUser,findUserByUsernameOrEmail } from "../services/userModel";
import bcrypt from "bcrypt";
import { signToken } from "../middleware/auth";


const register = async (req, res) => {

    try {
        const { username, email, password, role = "worker", full_name, phone } = req.body;

        if (!username || !email || !password || !full_name) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        //check if user exist

        const existingUser = await findUserByUsernameOrEmail(username, email);
        if (existingUser) {
            return res.status(409).json({ error: "Username or email already in use" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await createUser({ username, email, password_hash, role, full_name, phone });

        //token
        const token = signToken({ 
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email,
              role: newUser.role,
              full_name: newUser.full_name,
            },
            token,
          });
    } catch(error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try{
        const { username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // active
        if (!user.is_active) return res.status(401).json({ error: "Account is deactivated" });

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = signToken({
            id: user.id,
            username: user.username,
            role: user.role
        });

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                full_name: user.full_name
            },
            token,
        });
    } catch(error){
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}