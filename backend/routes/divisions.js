const express = require("express");
const Division = require("../models/Division");
const Officer = require("../models/Officer");
const Sailor = require("../models/Sailor");
const { authMiddleware } = require("../middleware/auth");
const permit = require("../middleware/rbac");
const router = express.Router();

// list divisions with embedded officers & sailors for convenience
router.get("/", authMiddleware, permit("admin","co","officer","sailor"), async (req, res) => {
  const divisions = await Division.find().lean();
  const data = await Promise.all(divisions.map(async d=>{
    const officers = await Officer.find({ division: d._id }).lean();
    const sailors = await Sailor.find({ division: d._id }).lean();
    return { ...d, officers, sailors };
  }));
  res.json(data);
});

// create division (admin/co)
router.post("/", authMiddleware, permit("admin","co"), async (req, res) => {
  try {
    const d = await Division.create({ name: req.body.name });
    res.json(d);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
