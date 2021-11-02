const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send({ data: users }))
  .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));

const getUser = (req, res) => User.findbyId(req.params.id)
  .orFail()
  .then((user) => res.status(200).send({ data: user }))
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else {
      res.status(200).send({ data: user });
    }
  })
  .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findbyIdandUpdate(req.params.id, { name, about }, { new: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findbyIdandUpdate(req.params.id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(res.status(500).send({ message: 'Creation Failed At Server' }));
};

module.exports = {
  getUsers, getUser, updateUser, updateAvatar, createUser,
};
