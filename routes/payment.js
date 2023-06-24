const express = require('express');
const {
  order,
  verify,
  getAllOrders,
} = require('../controller/paymentController');
const router = express.Router();

router.post('/create', order);
router.post('/verify', verify);
router.post('/all', getAllOrders);

module.exports = router;
