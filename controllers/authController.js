const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User")
require("dotenv").config();
const Auth = require("../models/Auth");

const createUser = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Invalid params" });
    }
    const user = await Auth.findOne({ email });


    if (user) {
      return res.status(500).json({
        message: "User already exist",
        statusCode: 500,
      });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new Auth({
      username,
      email,
      password: hashPassword,
    });

    const data = await newUser.save();
    const userData = new User({
      _id: data._id,
      firstName,
      lastName
    })
    await userData.save();
    return res.status(201).json({ message: "User Registerd", statusCode: 201 });
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
    const user = await Auth.findOne({ email });

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
          { expiresIn: "1h" }
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
