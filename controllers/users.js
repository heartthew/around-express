const path = require('path');
const getFileData = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => getFileData(dataPath)
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err));

const getUserbyId = (req, res) => getFileData(dataPath)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else {
      res.status(200).send(user);
    }
  })
  .catch((err) => res.status(500).send(err));

module.exports = { getUsers, getUserbyId };
