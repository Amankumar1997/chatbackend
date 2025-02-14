const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/User");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(400).json({ error: "Invalid params" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({
        message: "User already exist",
        statusCode: 500,
      });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const currentHashPass = await bcrypt.compare(password, hashPassword);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User Registerd" });
  } catch (error) {
    res.status(500).json({ error, message: "Internal Server Error" });
  }
};

// const loginUser = async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//       if (!username || !email || !password) {
//         res.status(400).json({ error: "Invalid params" });
//       }
//       const user = await User.findOne({ email });

//       // if (user) {
//       //   return res.status(500).json({
//       //     message: "User already exist",
//       //     statusCode: 500,
//       //   });
//       // }

//       const saltRounds = 10;
//       const hashPassword = await bcrypt.hash(password, saltRounds);
//      const currentHashPass=await bcrypt.compare(password, hashPassword)
//       const newUser = new User({
//         username,
//         email,
//         password: hashPassword,
//       });
//       await newUser.save();
//       return res.status(201).json({ message: "User Registerd" });
//       // let token;
//       // try {
//       //   //Creating jwt token
//       //   token = jwt.sign(
//       //     {
//       //         username
//       //     //   userId: user.id,
//       //     //   email: existingUser.email,
//       //     },
//       //     process.env.secretKey,
//       //     { expiresIn: "1m" }
//       //   );

//       //   console.log(token);
//       // const d=  jwt.verify(token, process.env.secretKey);
//       // console.log("d",d);
//       // } catch (err) {
//       //   console.log(err);
//       //   const error = new Error("Error! Something went wrong.");
//       //   return next(error);
//       // }
//       // console.log("token", token);
//     } catch (error) {
//       res.status(500).json({ error, message: "Internal Server Error" });
//     }
//   };

module.exports = { createUser };
