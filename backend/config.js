module.exports = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ship_hrm",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  PORT: process.env.PORT || 5000,
};
