const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    instituteName: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    courseName: {
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
const Education = new mongoose.model("Education", educationSchema);
module.exports = Education;
