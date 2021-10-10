const router = require('express').Router();
const { getUsers, getUserbyId} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserbyId);

module.exports = router;