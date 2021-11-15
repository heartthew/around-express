const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name, about, avatar,
  } = req.body;

  User.create({
    name, about, avatar,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Serve unable to create user.' }));
};

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(201).send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Server failed to return users.' }));

const getUser = (req, res) => {
  const id = req.params.userId;
  console.log(id);

  User.findById(id)
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Invalid User ID.' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Server has borked this attempt.' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID does not exist.' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Server did not complete update.' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID does not exist.' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Avatar unchanged. Server failure.' }));
};

module.exports = {
  getUsers, getUser, updateUser, updateAvatar, createUser,
};
