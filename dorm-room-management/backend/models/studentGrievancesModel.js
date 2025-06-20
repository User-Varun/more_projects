const mongoose = require("mongoose");

const studentGrievancesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A problem must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A problem must have a description"],
    trim: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference the student who posted the problem
    required: [true, "A problem must be associated with a user"],
  },
  dormName: {
    type: String,
    required: [true, "Please specify the dorm name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const studentGrievance = mongoose.model(
  "StudentGrievance",
  studentGrievancesSchema
);

module.exports = studentGrievance;
