const express = require('express');
const {storeLeads, getAiResponse, startIntake, saveStep, getFileUrl} = require('../controllers/leads');
const upload = require('../config/multerConfig');
const handleMulterError = require('../middlewares/handleMulterErrors');


const router = express.Router();

router.post('/store-leads', storeLeads);
router.post('/get-file-url',upload, handleMulterError, getFileUrl);
router.post('/get-response', getAiResponse);

router.get('/start-intake', startIntake);
router.post('/save-step', saveStep);


module.exports = router;