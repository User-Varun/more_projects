const express = require("express");

const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");
const catchAsync = require("../utills/catchAsync");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.get(
  "/:id/findBestRoomMate",
  authController.protect,
  studentController.findBestRoomMate
);

router.get("/studentGrievance", studentController.getAllStudentsGrievance);

router.post(
  "/:id/studentGrievance",
  authController.protect,
  studentController.postStudentGrievance
);

router.patch("/updateMe", authController.protect, studentController.updateMe);

module.exports = router;
