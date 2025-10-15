const express = require("express");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");
const permit = require("../middleware/rbac");
const router = express.Router();

// list users - admin/co can list all, others only see self via /me
router.get("/", authMiddleware, permit("admin","co"), async (req, res) => {
  res.json(await User.find().lean());
});

// create user - admin/co only
router.post("/", authMiddleware, permit("admin","co"), async (req, res) => {
  try {
    const { serviceNo, password, role } = req.body;
    const u = await User.create({ serviceNo, password, role });
    res.json(u);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
