const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
