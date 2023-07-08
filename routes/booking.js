const express = require('express');
const {
  createBooking,
  getAllBookings,
  getBookingById,
} = require('../controller/bookingsController');
const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById)

module.exports = router;
