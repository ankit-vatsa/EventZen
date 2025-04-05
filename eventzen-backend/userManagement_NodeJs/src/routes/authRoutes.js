// import express from "express";
// const router = express.Router();

// // Define your authentication routes
// router.post("/login", (req, res) => {
//   res.send("Login Route");
// });

// router.post("/register", (req, res) => {
//   res.send("Register Route");
// });

// // Named export (No "default")
// export { router };

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {db} from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Default role to "customer" if not provided
  const userRole = role === "admin" ? "admin" : "customer";

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into DB
  db.query(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, userRole],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "User registered successfully!" });
    }
  );
});

// Login User
router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
      if (err || users.length === 0) return res.status(401).json({ error: "Invalid credentials" });
    
      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password_hash);  // 🔹 Use 'password_hash' instead of 'password'
    
      if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials" });
    
      // Generate JWT Token
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
      res.json({ success: true, token, role: user.role });
    });
  });
  

export { router };