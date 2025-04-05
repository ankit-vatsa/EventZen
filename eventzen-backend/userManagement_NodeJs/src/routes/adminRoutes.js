import express from "express";
import {db} from "../config/db.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ✅ Admin: Get All Users (For Admin Dashboard)
 */
router.get("/users", verifyToken, requireRole("admin"), (req, res) => {
  db.query("SELECT id, name, email, role, pending_profile_changes FROM users", (err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, users });
  });
});

/**
 * ✅ Admin: Approve Profile Updates
 */
router.put("/profile/approve/:userId", verifyToken, requireRole("admin"), (req, res) => {
    const { userId } = req.params;
  
    db.query("SELECT pending_profile_changes FROM users WHERE id = ?", [userId], (err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      if (users.length === 0) return res.status(404).json({ error: "User not found" });
  
      const pendingChanges = users[0].pending_profile_changes 
        ? JSON.parse(users[0].pending_profile_changes)  // ✅ Parse only if not null
        : null;
  
      if (!pendingChanges) return res.status(400).json({ error: "No pending updates for this user" });
  
      // ✅ Apply changes and clear pending_profile_changes
      db.query(
        "UPDATE users SET name = ?, email = ?, pending_profile_changes = NULL WHERE id = ?",
        [pendingChanges.name, pendingChanges.email, userId],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true, message: "Profile update approved." });
        }
      );
    });
  });

/**
 * ✅ Admin: Reject Profile Update (Clear Pending Changes)
 */
router.put("/profile/reject/:userId", verifyToken, requireRole("admin"), (req, res) => {
  const { userId } = req.params;

  db.query(
    "UPDATE users SET pending_profile_changes = NULL WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Profile update rejected." });
    }
  );
});

/**
 * ✅ Admin: Update User Role
 */
router.put("/user/role/:userId", verifyToken, requireRole("admin"), (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!["admin", "customer"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  db.query(
    "UPDATE users SET role = ? WHERE id = ?",
    [role, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "User role updated successfully." });
    }
  );
});

export default router;
