const express = require('express');
const {otpLimiter} = require('../utils/limiters');
const {sendOtpToPhone,verifyOtp, notarySignup, validateEmailOtp, getEmailOtp, sendUserDetails} = require('../controllers/notary')


const router = express.Router();

router.get('/get-otp',otpLimiter,sendOtpToPhone );
router.get('/get-email-otp', otpLimiter, getEmailOtp);
router.post('/validate-email', validateEmailOtp);
router.post('/sign-up',notarySignup);
router.post('/verify-otp',verifyOtp);
router.post('/send-user-details',sendUserDetails)
module.exports = router;