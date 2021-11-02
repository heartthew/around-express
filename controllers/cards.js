const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards }))
  .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));

const createCard = (req, res) => {
  const {
    name, link, owner, likes, createdAt,
  } = req.body;

  console.log(req.user._id);

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(res.status(500).send({ message: 'Rut ro, no Create-O' }));
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));

const likeCard = (req, res) => {
  Card.findByIdandUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
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
