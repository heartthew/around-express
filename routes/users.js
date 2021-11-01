const userRouter = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:_id', getUser);
userRouter.post('/', createUser);

module.exports = userRouter;
