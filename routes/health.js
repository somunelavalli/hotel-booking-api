const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ message: 'App Health is Good' });
});

module.exports = router;
