const Card = require('../models/card');

const createCard = (req, res) => {
  const {
    name, link, owner, likes, createdAt,
  } = req.params;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch(res.status(500).send({ message: 'Rut ro, no Create-O' }));
};

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards }))
  .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findOneAndRemove(id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Deletion failed at server.' }));
};

const likeCard = (req, res) => {
  const { id } = req.params;

  Card.findOneandUpdate(
    { id },
    { $addToSet: { likes: req.user.cardId } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const unlikeCard = (req, res) => {
  Card.findByIdandUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
