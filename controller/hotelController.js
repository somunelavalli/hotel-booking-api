const Hotel = require("../models/Hotel");

const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted successfully");
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  const { min, max, ...otherData } = req.query;
  console.log(min, max, otherData);
  try {
    const hotels = await Hotel.find({
      ...otherData,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limt);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        const modifiedCity =
          city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        return Hotel.countDocuments({ city: modifiedCity });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const appartmentCount = await Hotel.countDocuments({ type: "appartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  res.status(200).json([
    { type: "hotel", count: hotelCount },
    { type: "appartment", count: appartmentCount },
    { type: "resort", count: resortCount },
    { type: "villa", count: villaCount },
    { type: "cabin", count: cabinCount },
  ]);
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  countByCity,
  countByType,
};
