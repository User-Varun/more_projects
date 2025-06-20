const AppError = require("../utills/appError");

const handleCastErrorDB = (err) => {
  const message = `INVALID ${err.path} : ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);

  const message = `Duplicate Field value: ${value} Please use another value`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `invalid input data ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("invalid token. Please login again", 401);

const handleJWTExpiredError = () =>
  new AppError("token expired. please login in again to get access", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // programming or other unknown error : don't leak info to client
  } else {
    // (1) log Error
    // eslint-disable-next-line no-console
    console.error("ERROR 💥", err);

    // (2) send a generic message
    res.status(500).json({
      status: "error",
      message: "something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
  else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();

    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
