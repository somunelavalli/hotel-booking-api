const express = require("express");
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../controller/userController");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// Update Hotel
router.put("/:id", verifyUser, updateUser);

// Delete Hotel
router.delete("/delete/:id", verifyUser, deleteUser);

// Get All Hotels
router.get("/all", verifyAdmin, getAllUsers);

// Get a hotel
router.get("/:id", verifyUser, getUser);

module.exports = router;
