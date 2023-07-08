const Booking = require('../models/Booking');

const createBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    return res
      .status(201)
      .send({ message: 'Bookig created Successfully', data: savedBooking });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    return res
      .status(200)
      .send({ message: 'Bookings retreived successfully', data: bookings });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    return res
      .status(200)
      .send({ message: 'Booking retreived successfully', data: booking });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getAllBookings, getBookingById };
