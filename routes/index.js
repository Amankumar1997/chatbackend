const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/userController");
const {
  updateProfile,
  getProfile,
  addExperince,
} = require("../controllers/profileController");
const verifyToken = require("../middleware/verifytoken");

router.post("/register", createUser);
router.post("/login", login);
router.put("/updateProfile", verifyToken, updateProfile);
router.get("/getProfile", verifyToken, getProfile);
router.post("/addExperince", verifyToken, addExperince);
module.exports = router;
