const mongoose = require("mongoose");
const validator = require("validator");
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcrypt");

const habitPreferenceSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: [true, "Each habit must have a name."],
    trim: true,
  },
  preference: {
    type: String,
    required: [true, "Each preference must have a description."],
    trim: true,
  },
});

// name, email ,photo , password , passwordConfirm , user's habits and preference
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "user email address must be unique"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please comfirm your password"],
    // this only works on CREATE and SAVE!!!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  habitsAndPreference: {
    type: [habitPreferenceSchema], // Embeds the sub-schema
    validate: {
      validator: function (value) {
        return Array.isArray(value) && value.length > 0;
      },
      message: "The habitsAndPreference array must contain at least one entry.",
    },
  },
});

studentSchema.pre("save", async function (next) {
  // only run this fn if password was acctually modfied
  if (!this.isModified("password")) return next();

  // cost or salt = 12
  this.password = await bcrypt.hash(this.password, 12);

  // to remove from database
  this.passwordConfirm = undefined;
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassoword,
  userPassword
) {
  return await bcrypt.compare(candidatePassoword, userPassword);
};

studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  // password not changed
  return false;
};

const User = mongoose.model("Student", studentSchema);

module.exports = User;
