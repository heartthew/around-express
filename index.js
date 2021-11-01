const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use('users/', userRouter);
app.use('cards/', cardRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use((req, res, next) => {
  req.user = {
    _id: '----', // test user id
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
