const express = require('express');
const mongoose = require('mongoose');

const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use('/', userRouter);
app.use('/', cardRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // test user id
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
