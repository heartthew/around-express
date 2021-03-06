const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const allowedOrigins = [
  'https://around.nomoreparties.co',
  'http://around.nomoreparties.co',
  'http://localhost:3000',
];

app.use(cors({ origin: allowedOrigins }));

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: 'true',
});

app.use((req, res, next) => {
  req.user = {
    _id: '6191345dff28e3d21fcc4bea', // test user id
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested route not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
