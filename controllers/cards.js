const Card = require('../models/card');

const createCard = (req, res) => {
  const {
    name, link, owner,
  } = req.body;

  console.log(req.user._id);

  Card.create({
    name, link, owner,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Rut ro, no Create-O!' }));
};

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards }))
  .catch(() => res.status(500).send({ message: 'Server failed to retrieve cards.' }));

const deleteCard = (req, res) => {
  const id = req.params.cardId;

  Card.deleteOne({ _id: id })
    .orFail()
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Deletion failed at server.' }));
};

const likeCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Invalid Card ID.' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const unlikeCard = (req, res) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Invalid User ID.' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
