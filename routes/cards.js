const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard); // underscore or no?
cardRouter.put('/cards/', likeCard);
cardRouter.delete('/cards', unlikeCard);

module.exports = cardRouter;
