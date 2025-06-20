// eslint-disable-next-line import/no-extraneous-dependencies
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const catchAsync = require("../utills/catchAsync");
const AppError = require("../utills/appError");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res) => {
  // remove the flaw of user adding extra info to create user (like making themselves admin)

  const { habitsAndPreference } = req.body;

  // Check if habitsAndPreference is an array
  if (!Array.isArray(habitsAndPreference)) {
    return res.status(400).json({
      success: false,
      message: "habitsAndPreference must be an array.",
    });
  }

  // Check if each item in the array is valid
  for (const item of habitsAndPreference) {
    if (typeof item.habit !== "string" || typeof item.preference !== "string") {
      return res.status(400).json({
        success: false,
        message:
          'Each entry in habitsAndPreference must have "habit" and "preference" as strings.',
      });
    }
  }

  // the password must be a string , otherwise bcrpt will not be able to compare
  const newStudent = await Student.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
    habitsAndPreference: req.body.habitsAndPreference,
  });

  createSendToken(newStudent, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) CHECK IF EMAIL AND PASSWORD EXIST
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  // 2) CHECK IF USER EXISTS AND PASSWORD IS CORRECT
  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    return next(new AppError("incorrect email or password", 401));
  }

  // 3) IF EVERYTHING OK , SEND TOKEN TO CLIENT
  createSendToken(student, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) GETTING THE TOKEN AND CHECK IF IT'S THERE
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you are not logged in! please login to get access", 401)
    );
  }
  // 2) VERIFICATION TOKEN
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) CHECK IF USER STILL EXISTS
  const currentUser = await Student.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token does no longer exist", 401)
    );
  }

  // 4) CHECK IF USER CHANGED PASSWORD AFTER TOKEN WAS ISSUED
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // Grant access to protected Route
  req.user = currentUser;
  next();
});

// eslint-disable-next-line arrow-body-style
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to do this action!", 403)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. get user from collection
  const { passwordCurrent } = req.body;

  const currentUser = await User.findById(req.user.id).select("+password");

  // 2. check if posted currect password is correct
  if (
    !(await currentUser.correctPassword(passwordCurrent, currentUser.password))
  ) {
    return next(
      new AppError("incorrect current password! Please try again.", 401)
    );
  }

  // 3. if so, update the password

  currentUser.password = passwordCurrent;
  currentUser.passwordConfirm = passwordCurrent;

  // 4. log user in , send jwt
  createSendToken(currentUser, 200, res);
});
