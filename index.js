const express = require('express');
const mongoose = require('mongoose');

const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use('/users', userRouter);
app.use('/cards', cardRouter);
/* app.use((req, res, next) => {
  req.user = {
    _id: '----', // test user id
  };

  next();
}); */
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Requested item iiiiiis not found' });
}); 

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
