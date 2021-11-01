const userRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser); // path??
userRouter.patch('/users/me/avatar', updateAvatar); // path??

module.exports = userRouter;
