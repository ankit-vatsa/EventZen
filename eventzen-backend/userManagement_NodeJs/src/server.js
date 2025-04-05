// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/authRoutes");
// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { router as authRoutes } from "./routes/authRoutes.js";
// import protectedRoutes from "./routes/protectedRoutes.js"; // Import protected routes
// import { db } from "./config/db.js"; // Named import


// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api", protectedRoutes);  // Register protected routes

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {router as authRoutes} from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js"; // Import protected routes
import {db} from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);  // Register protected routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
