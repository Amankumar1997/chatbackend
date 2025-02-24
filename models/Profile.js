const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: String,
  lastName: String,
  headline: String,
  experience: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projects" }],
});

module.exports = mongoose.model("Profile", ProfileSchema);
