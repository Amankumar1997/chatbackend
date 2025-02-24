const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/userController");
const {
  updateProfile,
  getProfile,
  addExperince,
  deleteExperience,
  updateExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addProject,
  updateProject,
  deleteProject
} = require("../controllers/profileController");
const verifyToken = require("../middleware/verifytoken");

router.post("/register", createUser);
router.post("/login", login);
router.put("/updateProfile", verifyToken, updateProfile);
router.get("/getProfile", verifyToken, getProfile);
router.post("/addExperince", verifyToken, addExperince);
router.delete("/deleteExperience",verifyToken,deleteExperience);
router.put("/updateExperience",verifyToken,updateExperience);
router.post("/addEducation",verifyToken,addEducation);
router.put("/updateEducation",verifyToken,updateEducation);
router.delete("/deleteEducation",verifyToken,deleteEducation);
router.post("/addProject",verifyToken,addProject);
router.put("/updateProject",verifyToken,updateProject);
router.delete("/deleteProject",verifyToken,deleteProject);

module.exports = router;
