const mongoose = require("mongoose");
const Auth = require("./Auth");
const ProfileSchema = new mongoose.Schema({
  auth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  headline: String,
  location: {
    city: String,
    country: String,
  },
  contactInfo: {
    // email: { type: String, required: true },
    phone: String,
    website: String,
  },
  experience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience' // Reference to the Experience model
  }],
  // skills: [String],
  // education: [
  //   {
  //     school: String,
  //     degree: String,
  //     startDate: Date,
  //     endDate: Date,
  //   },
  // ],
  // profilePicture: String,
  // bio: String,
  //   connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  //   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  //   recommendations: [
  //     {
  //       recommender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //       recommendation: String,
  //     },
  //   ],
  //   posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  // isProfileComplete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Profile", ProfileSchema);
