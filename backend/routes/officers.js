const express = require("express");
const Officer = require("../models/Officer");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");
const permit = require("../middleware/rbac");
const router = express.Router();

// list officers - admin/co see all, officer sees their own
router.get("/", authMiddleware, permit("admin","co","officer"), async (req, res) => {
  const { role, _id } = req.user;
  if (role === 'admin' || role === 'co') {
    return res.json(await Officer.find().populate('division').lean());
  }
  // officer -> own record
  const officer = await Officer.findOne({ user: _id }).populate('division').lean();
  res.json(officer ? [officer] : []);
});

// create officer (admin/co)
router.post("/", authMiddleware, permit("admin","co"), async (req, res) => {
  try {
    const { serviceNo, password, name, rank, division } = req.body;
    const user = await User.create({ serviceNo, password, role: "officer" });
    const officer = await Officer.create({ user: user._id, name, rank, division });
    res.json({ user, officer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
