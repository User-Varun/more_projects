const express = require("express");

const errorController = require("./controllers/errorController");

const app = express();
const hotelsRouter = require("./routes/hotelsRoutes");
const AppError = require("./utills/appError");

// Middleware (for parsing json body)
app.use(express.json());

/*
Routes

/api/v1/hotels -- to get all hotels(get),  (post)add new hotel, 

/api/v1/hotels/:id -- get(the hotel by id) , update(update hotel details), remove(remove hotel details)

*/

// middlewares Routes
app.use("/api/v1/hotels", hotelsRouter);

app.all(/(.*)/, (req, res, next) => {
  //method 3 (most suggested)
  next(new AppError(`cant find the given route ${req.originalUrl}`, 404));

  // method 1
  //   res.status(404).json({
  //     status: "fail",
  //     message: `cant find the given route ${req.originalUrl}`,
  //   });

  //method 2
  // const err = new Error(`cant find the given route ${req.originalUrl}`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next(err);
});

// Global Error Handling middleware
app.use(errorController);

module.exports = app;
