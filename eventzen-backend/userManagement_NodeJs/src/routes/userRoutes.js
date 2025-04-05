import express from "express";
import {db} from "../config/db.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Request Profile Update (User)
router.put("/profile/update", verifyToken, (req, res) => {
  const userId = req.user.userId;
  const { name, email } = req.body;

  // Store changes in pending_profile_changes
  const pendingChanges = JSON.stringify({ name, email });

  db.query(
    "UPDATE users SET pending_profile_changes = ? WHERE id = ?",
    [pendingChanges, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Profile update requested. Awaiting admin approval." });
    }
  );
});
// ✅ Get User Profile
router.get("/profile", verifyToken, (req, res) => {
    const userId = req.user.userId;
  
    db.query("SELECT name, email, role, pending_profile_changes FROM users WHERE id = ?", [userId], (err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      if (users.length === 0) return res.status(404).json({ error: "User not found" });
  
      res.json({ success: true, user: users[0] });
    });
  });
  
export default router;
