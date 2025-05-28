const express = require('express');
const sendQuery = require('../controllers/contact');

const router = express.Router();

router.post('/send-query',sendQuery);

module.exports = router;