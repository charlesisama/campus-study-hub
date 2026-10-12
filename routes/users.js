const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const ensureAuthenticated = require('../middleware/auth');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

router.post('/', ensureAuthenticated, usersController.createUser);
router.put('/:id', ensureAuthenticated, usersController.updateUser);
router.delete('/:id', ensureAuthenticated, usersController.deleteUser);

module.exports = router;