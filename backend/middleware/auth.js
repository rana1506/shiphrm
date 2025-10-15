const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id).lean();
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
