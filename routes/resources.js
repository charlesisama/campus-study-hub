const express = require('express');
const router = express.Router();

const resourcesController = require('../controllers/resources');
const ensureAuthenticated = require('../middleware/auth');

router.get('/', resourcesController.getAllResources);
router.get('/:id', resourcesController.getResourceById);
router.post('/', ensureAuthenticated, resourcesController.createResource);
router.put('/:id', ensureAuthenticated, resourcesController.updateResource);
router.delete('/:id', resourcesController.deleteResource);

module.exports = router;