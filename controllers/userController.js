const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/User");
const Experience = require("../models/Experience");
const updateProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId Required", statusCode: 400 });
    }

    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", statusCode: 404 });
    }

    // Update the user's profile
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated succesfully",
      statusCode: 200,
      data: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error", statusCode: 500 });
  }
};
const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(404)
        .json({ message: "User not found", statusCode: 404 });
    }

    const data = await User.findOne({ _id: req.user._id }).populate(
      "experience"
    );

    return res
      .status(200)
      .json({ message: "success", statusCode: 200, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error", statusCode: 500 });
  }
};

const addExperince = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", statusCode: 404 });
    }

    const newUser = new Experience(req.body);

    const data = await newUser.save();

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

module.exports = { updateProfile, getProfile, addExperince };
