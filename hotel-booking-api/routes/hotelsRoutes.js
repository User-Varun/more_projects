const express = require("express");

const router = express.Router();

const hotelSControllers = require("../controllers/hotelsControllers");

// Routes (after "/api/v1/hotels")
router
  .route("/")
  .get(hotelSControllers.getAllHotels)
  .post(hotelSControllers.addNewHotel);

router
  .route("/:id")
  .get(hotelSControllers.getHotel)
  .patch(hotelSControllers.updateHotel)
  .delete(hotelSControllers.deleteHotel);

module.exports = router;
