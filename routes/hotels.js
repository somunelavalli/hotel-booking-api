const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  countByCity,
  countByType,
} = require("../controller/hotelController");
const Hotel = require("../models/Hotel");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

// Create Hotel
router.post("/create", verifyAdmin, createHotel);

// Update Hotel
router.put("/:id", verifyAdmin, updateHotel);

// Delete Hotel
router.delete("/delete/:id", verifyAdmin, deleteHotel);

// Get All Hotels
router.get("/all", getAllHotels);

// Get a hotel
router.get("/find/:id", getHotel);

// Count by city
router.get("/countbycity", countByCity);

// Count by type
router.get("/countbytype", countByType);

module.exports = router;
