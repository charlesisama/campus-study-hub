const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups');
const ensureAuthenticated = require('../middleware/auth');



router.get('/', groupsController.getAllGroups);
router.get('/:id', groupsController.getGroupById);
router.post('/', ensureAuthenticated, groupsController.createGroup);
router.put('/:id', ensureAuthenticated, groupsController.updateGroup);
router.delete('/:id', groupsController.deleteGroup);

module.exports = router;