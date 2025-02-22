const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Profile = require("../models/Profile");
const Experience = require("../models/Experience");
const User = require("../models/User");

const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, headline, experience } = req.body;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID required", statusCode: 400 });
    }

    // Find the user's profile and update it
    let profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(headline && { headline }),
        },
        ...(experience && { $push: { experience: { $each: experience } } }),
      },
      { new: true, upsert: true }
    );

    // Link profile ID to user if newly created
    await User.findByIdAndUpdate(userId, { profile: profile._id });

    return res.status(200).json({
      message: "Profile updated successfully",
      statusCode: 200,
      data: profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(404)
        .json({ message: "User not found", statusCode: 404 });
    }

    const userProfile = await User.findById(req.user._id).populate({
      path: "profile",
      populate: { path: "experience" },
    });

    if (!userProfile) {
      return res
        .status(404)
        .json({ message: "Profile not found", statusCode: 404 });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      statusCode: 200,
      data: userProfile,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", statusCode: 500 });
  }
};

const addExperince = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Profile.findOne({ user: req.user._id });
    const newExperience = new Experience(req.body);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", statusCode: 404 });
    }
    await Profile.findOneAndUpdate(
      { user: userId },
      { $push: { experience: newExperience._id } },
      { new: true }
    );
    const data = await newExperience.save();

    return res.status(200).json({
      message: "Experience Added succesfully",
      statusCode: 200,
      data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error", statusCode: 500 });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { deleteId } = req.body;
    const userId = req.user._id;

    await Profile.findOneAndUpdate(
      { user: userId },
      { $pull: { experience: deleteId } },
      { new: true }
    );
    await Experience.findOneAndDelete({ _id: deleteId });
    return res.status(200).json({
      message: "Experience Deleted succesfully",
      statusCode: 200,
      data: {
        deleteId,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error", statusCode: 500 });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;
    await Profile.findOneAndUpdate(
      { user: userId, "experience._id": id },
      { $set: req.body },
      { new: true }
    );

    await Experience.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      message: "Experience Updated succesfully",
      statusCode: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error", statusCode: 500 });
  }
};

module.exports = {
  updateProfile,
  getProfile,
  addExperince,
  deleteExperience,
  updateExperience,
};
