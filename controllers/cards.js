const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards }))
  .catch((err) => res.status(500).send(err));

const createCard = (req, res) => {
  const {
    name, link, owner, likes, createdAt,
  } = req.body;

  console.log(req.user._id);

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(res.status(500).send({ message: 'Rut Ro' }));
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Error' }));

const likeCard = (req, res) => {
  Card.findByIdandUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send(err));
};

const unlikeCard = (req, res) => {
  Card.findByIdandUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
