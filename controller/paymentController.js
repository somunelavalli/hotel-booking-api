const Razorpay = require('razorpay');
const crypto = require('crypto');
const generateBookingId = require('../helpers/bookingIdGeneration')
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const order = async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: 'order_rcptid_11',
  };

  try {
    instance.orders.create(options, (err, order) => {
      if (err) {
        return res
          .status(500)
          .send({ message: 'Something went wrong with server', data: err });
      } else {
        let response = {...order, bookingId: generateBookingId()}
        return res
          .status(200)
          .send({ message: 'Order created Successfully', data: response });
      }
    });
  } catch (err) {
    console.log('Error', err);
    res.status(500).send({ message: 'Some went wrong', data: err });
  }
};

const verify = async (req, res) => {
  try {
    let body =
      req.body.response.razorpay_order_id +
      '|' +
      req.body.response.razorpay_payment_id;
    var expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
      console.log('sign is validddd');
      res.send({ code: 200, message: 'Sign Valid' });
    } else {
      res.send({ code: 500, message: 'Sign Invalid' });
    }
  } catch (error) {
    res.send({ code: 500, message: 'Something went wrong', data: error });
  }
};

const getAllOrders = async (req, res) => {
  instance.orders
    .all({
      from: req.body.from,
      to: req.body.to,
    })
    .then((resp) => {
      //   console.log(resp, 60);
      return res
        .status(200)
        .send({ message: 'Data successfully Fetched', data: resp.items });
    })
    .catch((err) => {
      console.log(err, 62);
      res.status(500).send({ message: 'Something Wrong', data: err });
    });
};

module.exports = { order, verify, getAllOrders };
