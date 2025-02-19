const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    startDate: {
      type: String || Date,
      required: true,
      unique: true,
    },
    endDate: {
      type: String || Date,
    },
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);
const Experience = new mongoose.model("Experience", ExperienceSchema);
module.exports = Experience;
