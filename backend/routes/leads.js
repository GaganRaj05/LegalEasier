const express = require('express');
const {storeLeads, getAiResponse} = require('../controllers/leads');

const router = express.Router();

router.post('/store-leads', storeLeads);

router.post('/get-response', getAiResponse);

module.exports = router;