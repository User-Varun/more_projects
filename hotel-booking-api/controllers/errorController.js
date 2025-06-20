const AppError = require("../utills/appError");

const handleCastErrorDB = (err) => {
  const message = `INVALID ${err.path} : ${err.value}`;

  return new AppError(message, 400); // bad request
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};
const sendErrorProd = (err, res) => {
  //   console.log(err);

  // only send nessessary data , trusted error, known error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // 1. log the error to server
    // console.error("Error 💥", err);

    // 2. send a generic response to client
    res.status(500).json({
      status: "error",
      message: "Something went very wrong"
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);

    // console.log("code running here");
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    console.log("fromm errorcon.", err);

    sendErrorProd(error, res);
  }
};
