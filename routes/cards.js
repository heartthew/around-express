const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:id', deleteCard);
cardRouter.put('/:id/likes', likeCard);
cardRouter.delete('/:id/likes', unlikeCard);

module.exports = cardRouter;
