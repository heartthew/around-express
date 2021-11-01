const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards }))
  .catch((err) => res.status(500).send(err));

const createCard = (req, res) => {
  const {
    name, link, owner, likes, createdAt,
  } = req.body;
  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(res.status(500).send({ message: 'Error' }));
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Error' }));

module.exports = { getCards, createCard, deleteCard };
