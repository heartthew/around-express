const User = require('../models/user');

const createUser = (req, res) => {
  console.log(req.body);
  const duuude = req.body;
  return User.create(duuude)
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Creation failed at server.' }));
};

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Server failed to return users.' }));

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById({ id })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Server has borked this attempt.' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneandUpdate(req.params.id, { name, about }, { new: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Invalid User ID.' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Server did not complete update.' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findbyIdandUpdate(req.params.id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
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
