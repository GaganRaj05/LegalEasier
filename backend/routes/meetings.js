const express = require('express');
const {scheduleMeetings} = require('../controllers/meetings');
const router = express.Router();

router.post('/schedule-meeting',scheduleMeetings);


module.exports = router;