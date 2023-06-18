const express = require('express');
const { orders, verify } = require('../controller/paymentController');
const router = express.Router();

router.post('/create', orders);
router.post('/verify', verify);

module.exports = router;
