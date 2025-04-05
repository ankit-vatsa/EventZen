import express from "express";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Admin Route
router.get("/admin/dashboard", verifyToken, requireRole("admin"), (req, res) => {
  res.json({ success: true, message: "Welcome to the Admin Dashboard" });
});

// Protected Customer Route
router.get("/customer/profile", verifyToken, requireRole("customer"), (req, res) => {
  res.json({ success: true, message: "Welcome to Customer Profile" });
});

export default router;
