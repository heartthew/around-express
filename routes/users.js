const userRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/:id', updateUser);
userRouter.patch('/:id/avatar', updateAvatar);

module.exports = userRouter;
