const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const AppError = require("./utills/appError");
const globalErrorHandler = require("./controllers/errorController");
const studentRouter = require("./routes/studentRoutes");
// const userRouter = require("./routes/userRoutes");

// 1) Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body-parser middleware
app.use(express.json());
// cors-enable middleware
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use("/api/v1/students", studentRouter);

// app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `cant find the given route ${req.originalUrl} on this server`,
      404
    )
  );
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
