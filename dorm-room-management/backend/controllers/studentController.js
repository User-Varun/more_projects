const Student = require("../models/studentModel");
const catchAsync = require("../utills/catchAsync");
const AppError = require("../utills/appError");
const StudentGrievance = require("../models/studentGrievancesModel");

function calculateMatchScore(student1, student2) {
  const habits1 = student1.habitsAndPreference.map((item) => item.habit);
  const habits2 = student2.habitsAndPreference.map((item) => item.habit);

  const preferences1 = student1.habitsAndPreference.map(
    (item) => item.preference
  );
  const preferences2 = student2.habitsAndPreference.map(
    (item) => item.preference
  );

  const habitSet1 = new Set(habits1);
  const habitSet2 = new Set(habits2);

  const preferenceSet1 = new Set(preferences1);
  const preferenceSet2 = new Set(preferences2);

  // Count matched habits
  const matchedHabits = [...habitSet1].filter((habit) =>
    habitSet2.has(habit)
  ).length;

  // Count matched preferences
  const matchedPreferences = [...preferenceSet1].filter((preference) =>
    preferenceSet2.has(preference)
  ).length;

  // Return total score
  return matchedHabits + matchedPreferences;
}

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedStudent = await Student.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedStudent,
    },
  });
});

exports.findBestRoomMate = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;

  const currentStudent = await Student.findById(studentId);
  if (!currentStudent) {
    return next(new AppError("user not found", 401));
  }

  const allStudents = await Student.find({ _id: { $ne: studentId } });

  let bestMatch = null;
  let highestScore = -1;

  allStudents.forEach((potentialRoommate) => {
    const score = calculateMatchScore(currentStudent, potentialRoommate);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = potentialRoommate;
    }
  });

  res.status(200).json({
    bestRoommate: bestMatch,
    score: highestScore,
  });
});

exports.postStudentGrievance = catchAsync(async (req, res) => {
  const { title, description, dormName, postedBy } = req.body;

  const newProblem = await StudentGrievance.create({
    title,
    description,
    dormName,
    postedBy,
  });

  res.status(201).json({
    status: "success",
    data: newProblem,
  });
});

exports.getAllStudentsGrievance = catchAsync(async (req, res, next) => {
  const allProblems = await StudentGrievance.find().populate(
    "postedBy",
    "name email"
  );

  res.status(200).json({
    status: "success",
    results: allProblems.length,
    data: allProblems,
  });
});
