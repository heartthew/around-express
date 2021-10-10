const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.status(404).send({ "message": "Requested resource not found" });
})

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})