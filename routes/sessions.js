const express = require('express');
const router = express.Router();

const sessionsController = require('../controllers/sessions');
const ensureAuthenticated = require('../middleware/auth');

router.get('/', sessionsController.getAllSessions);
router.get('/:id', sessionsController.getSessionById);
router.post('/', ensureAuthenticated, sessionsController.createSession);
router.put('/:id', ensureAuthenticated, sessionsController.updateSession);
router.delete('/:id', ensureAuthenticated, sessionsController.deleteSession);

module.exports = router;