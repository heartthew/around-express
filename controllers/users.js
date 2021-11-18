const User = require('../models/user');

const error = new Error('No user by that ID');
error.statusCode = 404;

const createUser = (req, res) => {
  const {
    name, about, avatar,
  } = req.body;

  User.create({
    name, about, avatar,
  })
    .then((user) => {
      console.error();
      if (!user) {
        throw error;
      } else {
        res.status(201).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Data entered incorrectly.' });
      } else {
        res.status(500).send({ message: 'Rut ro, no Create-O!' });
      }
    });
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
      console.error();
      if (!user) {
        throw error;
      } else {
        res.status(201).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Not a valid ID' });
      } else {
        res.status(500).send({ message: err.message || 'Server is Borked' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      console.error();
      if (!user) {
        throw error;
      } else {
        res.status(201).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Not a valid ID' });
      } else {
        res.status(500).send({ message: err.message || 'Server is Borked' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail()
    .then((user) => {
      console.error();
      if (!user) {
        throw error;
      } else {
        res.status(201).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Not a valid ID' });
      } else {
        res.status(500).send({ message: err.message || 'Server is Borked' });
      }
    });
};

module.exports = {
  getUsers, getUser, updateUser, updateAvatar, createUser,
};
