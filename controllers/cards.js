const Card = require('../models/card');

const error = new Error('No user by that ID');
error.statusCode = 404;

const createCard = (req, res) => {
  const {
    name, link, owner,
  } = req.body;

  Card.create({
    name, link, owner,
  })
    .then((card) => {
      console.error();
      if (!card) {
        throw error;
      } else {
        res.status(201).send({ data: card });
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

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards }))
  .catch(() => res.status(500).send({ message: 'Server failed to retrieve cards.' }));

const deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.deleteOne({ _id: id })
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
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID not found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Not a valid ID' });
      } else {
        res.status(500).send({ message: err.message || 'Server is Borked' });
      }
    });
};

const likeCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
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
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID not found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Not a valid ID' });
      } else {
        res.status(500).send({ message: err.message || 'Server is Borked' });
      }
    });
};

const unlikeCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
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
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'ID not found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Not a valid ID' });
      } else {
        res.status(500).send({ message: err.message || 'Server is Borked' });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
