const Razorpay = require('razorpay');

const orders = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

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
        return res
          .status(200)
          .send({ message: 'Order created Successfully', data: order });
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
      .createHmac('sha256', KEY_SECRET)
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

module.exports = { orders, verify };
