const Hotel = require("../models/hotelsModel");
const APIFeatures = require("../utills/APIFeatures");
const AppError = require("../utills/appError");
const catchAsync = require("../utills/catchAsync");

module.exports.getAllHotels = catchAsync(async (req, res) => {
  const features = new APIFeatures(Hotel.find(), req.query).filter().sort();
  const hotels = await features.query;

  res.status(200).json({
    status: "success",
    results: hotels.length,
    data: { hotels: hotels }
  });
});

module.exports.getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel)
    return next(
      new AppError(
        `Can't find the hotel with the given ID ${req.params.id}`,
        404
      )
    );

  res.status(200).json({
    status: "success",
    hotel
  });
});

module.exports.addNewHotel = catchAsync(async (req, res) => {
  const hotels = await Hotel.create(req.body);

  res.status(201).json({
    status: "success",
    hotels
  });
});

module.exports.updateHotel = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  const hotel = await Hotel.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true
  });

  if (!hotel) {
    return next(
      new AppError(`Can't find the hotel with the given ID ${id}`, 404)
    );
  }

  res.status(204).json({
    status: "success",
    message: "data updated successfully"
  });
});

module.exports.deleteHotel = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const hotel = await Hotel.findByIdAndDelete(id);

  if (!hotel)
    return next(
      new AppError(`Can't find the hotel with the given ID ${id}`, 404)
    );

  res.send(200).json({
    message: "document successfully deleted"
  });
});
