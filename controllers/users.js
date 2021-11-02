const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send({ data: users }))
  .catch((err) => res.status(500).send(err));

const getUser = (req, res) => User.findbyId(req.params.id)
  .then((user) => res.status(200).send({ data: user }))
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else {
      res.status(200).send({ data: user });
    }
  })
  .catch((err) => res.status(500).send(err));

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findbyIdandUpdate(req.params.id, { name, about }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => res.status(500).send(err));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findbyIdandUpdate(req.params.id, { avatar }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => res.status(500).send(err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(res.status(500).send({ message: 'Error' }));
};

module.exports = {
  getUsers, getUser, updateUser, updateAvatar, createUser,
};
