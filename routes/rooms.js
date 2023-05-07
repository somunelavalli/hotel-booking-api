const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
} = require("../controller/roomController");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

// Create Room
router.post("/create/:hotelId", verifyAdmin, createRoom);

// Update Room
router.put("/:id", verifyAdmin, updateRoom);

// Delete Room
router.delete("/delete/:id/:hotelId", verifyAdmin, deleteRoom);

// Get All Rooms
router.get("/all", getAllRooms);

// Get a Room
router.get("/:id", getRoom);

module.exports = router;
