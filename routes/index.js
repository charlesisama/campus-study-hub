const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

router.use('/api-docs', (req, res, next) => {
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = [req.protocol];
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());

router.get('/', (req, res) => {
    res.send('Campus Study Hub API is running');
});

router.use('/users', require('./users'));
router.use('/groups', require('./groups'));

module.exports = router;