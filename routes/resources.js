const express = require('express');
const router = express.Router();

const resourcesController = require('../controllers/resources');

router.get('/', resourcesController.getAllResources);
router.get('/:id', resourcesController.getResourceById);
router.post('/', resourcesController.createResource);
router.put('/:id', resourcesController.updateResource);
router.delete('/:id', resourcesController.deleteResource);

module.exports = router;