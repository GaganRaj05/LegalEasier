const express = require('express');
const {handleSignIn, handleSignUp, getOtp, validateOTP,checkAuth} = require('../controllers/auth');
const router = express.Router();

router.get("/get-otp",getOtp);
router.post('/validate-otp',validateOTP);
router.post('/sign-up',handleSignUp);
router.post('/sign-in', handleSignIn);
router.get('/check-auth',checkAuth);


module.exports = router;
