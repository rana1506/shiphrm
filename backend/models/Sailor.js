const mongoose = require("mongoose");
const sailorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true },
  rank: { type: String },
  division: { type: mongoose.Schema.Types.ObjectId, ref: "Division", required: true },
}, 
{ timestamps: true });
module.exports = mongoose.model("Sailor", sailorSchema);
