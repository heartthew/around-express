const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));    //static not required 
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(bodyParser.urlencoded({ extended: true })); 

/* app.get('/data/users:id', (req, res) => { 
  // the code for handling requests 
  // with paths like /users/123, /users/mark, and so on

}); */

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
}) 