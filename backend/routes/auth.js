const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { serviceNo, password } = req.body;
    const user = await User.findOne({ serviceNo });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
