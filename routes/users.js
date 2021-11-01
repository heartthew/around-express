const userRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/:_id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/', updateUser); // path??
userRouter.patch('/', updateAvatar); // path??

module.exports = userRouter;
