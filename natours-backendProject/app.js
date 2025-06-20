const express = require('express');
const morgan = require('morgan');

const app = express();

const AppError = require('./utills/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// app.use((req, res, next) => {
//  console.log('Hello from the middleware✌️');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  //**************** old way of doing error handling********************

  // res.status(404).json({
  //   status: 'fail',
  //   message: `cant find the given route ${req.originalUrl}`,
  // });

  // const err = new Error(`cant find the given route ${req.originalUrl}`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err)

  //**************** new way of doing error handling********************

  next(
    new AppError(
      `cant find the given route ${req.originalUrl} on this server`,
      404,
    ),
  );
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
