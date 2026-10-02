const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Campus Study Hub API is running');
});

module.exports = router;