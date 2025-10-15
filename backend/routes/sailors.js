const express = require("express");
const Sailor = require("../models/Sailor");
const Officer = require("../models/Officer");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");
const permit = require("../middleware/rbac");
const router = express.Router();

// get sailors - permission gate then filtering
router.get("/", authMiddleware, permit("admin","co","officer","sailor"), async (req, res) => {
  const { role, _id } = req.user;
  if (role === "admin" || role === "co") {
    return res.json(await Sailor.find().populate('user', 'serviceNo').populate('division').lean());
  }
  if (role === "officer") {
    const officer = await Officer.findOne({ user: _id }).lean();
    if (!officer) return res.status(403).json({ message: "No division assigned" });
    return res.json(await Sailor.find({ division: officer.division }).populate('user', 'serviceNo').populate('division').lean());
  }
  if (role === "sailor") {
    return res.json(await Sailor.find({ user: _id }).populate('user', 'serviceNo').populate('division').lean());
  }
  res.status(403).json({ message: "Forbidden" });
});

// create sailor (admin/co/officer)
router.post("/", authMiddleware, permit("admin","co","officer"), async (req, res) => {
  try {
    const { serviceNo, password, name, rank, division } = req.body;
    const user = await User.create({ serviceNo, password, role: "sailor" });
    const sailor = await Sailor.create({ user: user._id, name, rank, division });
    res.json({ user, sailor });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
