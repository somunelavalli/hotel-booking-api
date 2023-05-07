require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

console.log('Env Variables ::: ', process.env.MONGO_URI);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongod DB');
  } catch (err) {
    throw err;
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hello Welcome to my new world');
});

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/hotel', require('./routes/hotels'));
app.use('/api/v1/user', require('./routes/auth'));
app.use('/api/v1/userdata', require('./routes/users'));
app.use('/api/v1/room', require('./routes/rooms'));
app.use('/api/v1/health', require('./routes/health'));

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Something went wrong';
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(port, async () => {
  await connect();
  console.log(`Server is up and running on PORT: ${port}`);
});
