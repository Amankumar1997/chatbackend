const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
require("dotenv").config();
const User = require("../models/User");

const createUser = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Invalid params" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", statusCode: 409 });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();

    // Automatically create a profile for the new user
    const newProfile = new Profile({
      user: newUser._id,
      firstName,
      lastName,
      headline: "",
      experience: [],
    });
    await newProfile.save();

    // Link the profile to the user
    await User.findByIdAndUpdate(newUser._id, { profile: newProfile._id });

    return res
      .status(201)
      .json({ message: "User Registered", statusCode: 201, newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error", statusCode: 500 });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Invalid params", statusCode: 400 });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({
        message: "User doesn`t exist",
        statusCode: 500,
      });
    }

    const currentHashPass = await bcrypt.compare(password, user.password);

    let token;
    if (currentHashPass) {
      try {
        //Creating jwt token
        token = jwt.sign(
          {
            _id: user.id,
            email: user.email,
          },
          process.env.secretKey,
          { expiresIn: "24h" }
        );

        return res
          .status(200)
          .json({ message: "Logged In successfully", statusCode: 200, token });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error while generating token", statusCode: 500 });
      }
    } else {
      return res
        .status(500)
        .json({ message: "Email or password wrong", statusCode: 500 });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error", statusCode: 500 });
  }
};

module.exports = { createUser, login };
