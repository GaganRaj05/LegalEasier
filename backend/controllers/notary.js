const { checkPhoneRateLimit, emailLimiter } = require("../utils/limiters");
const sendPhoneOtp = require("../utils/sendOtp");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
const Notary = require("../models/Notary");
const {sendMail, sendNotaryMail} = require('../utils/email');
const sendOtpToPhone = async (req, res) => {
  try {
    const phone = req.query.phone;
    const cleanedPhone = `+${phone.replace(/\s+/g, "")}`;
    const phoneExists = await Notary.findOne({ phone });
    if (phoneExists)
      return res
        .status(400)
        .json({
          success: false,
          msg: "A user exits with this phone please login",
        });
    console.log(cleanedPhone);
    const allowed = await checkPhoneRateLimit(cleanedPhone);
    if (!allowed)
      return res
        .status(429)
        .json({
          success: false,
          msg: "To many otp request, try again in few minutes",
        });
    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendPhoneOtp(cleanedPhone, otp);
    await redis.set(`otp:${cleanedPhone}`, otp, "EX", 300);
    return res
      .status(200)
      .json({ success: true, msg: "Otp sent successfully" });
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("Invalid phone number")) {
      return res.status(400).json({
        success: false,
        message:
          "Twilio rejected this number. Please enter a valid U.S. mobile number.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log(req.body)
    const cleanedPhone = `${phone.replace(/\s+/g, "")}`;
    console.log(cleanedPhone)
    const savedOtp = await redis.get(`otp:${cleanedPhone}`);
    console.log(savedOtp)
    if (!savedOtp) {
      return res
        .status(400)
        .json({ success: false, msg: "OTP expired please resend the otp " });
    }
    if (savedOtp === otp) {
      await redis.del(`otp:${cleanedPhone}`);
      return res.status(200).json({ success: true, msg: "otp verified" });
    }
    return res
      .status(400)
      .json({ success: false, msg: "Incorrect otp entered" });
  } catch (err) {
    return res
      .status(501)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const getEmailOtp = async (req, res) => {
  try {
    const email = req.query.email;
    const emailExists = await Notary.findOne({email});
    if(emailExists) return res.status(400).json({success:'false',msg:"Email exists, please login"});

    const allowed = await emailLimiter(email);
    if(!allowed) return res.status(400).json({success:false, msg:"To many requests, please try again"});

    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendMail(email, otp);
    await redis.set(`email-check:${email}`,otp,'EX',300);
    return res.status(200).json({success:true, msg:"Otp sent successfully"});

  } catch (err) {
    console.log(err);
    return res.status(501).json({success:false, msg:"Some error occured please try again later"});
  }
};

const validateEmailOtp =async (req, res) => {
    try {
        const {email, otp} = req.body;
        const valid = await redis.get(`email-check:${email}`);
        if(!valid) return res.status(400).json({success:false, msg:"OTP expired please request a new one"});

        if(valid !== otp) return res.status(400).json({success:false, msg:"Incorrect otp entered"});

        await redis.del(`email-check:${email}`);
        return res.status(200).json({success:true,msg:'email verified successfully'});
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
}

const notarySignup = async(req, res) => {
    try {
        const {name, email, phone, preferred_method, license_number,state, expiration_date, services_offered, business_name, business_address, website_url, years_in_business} = req.body;

        await Notary.create({
            name, email, phone, preferred_method, license_number,state, expiration_date, services_offered, business_name, business_address, website_url, years_in_business
        });

        return res.status(201).json({success:true, msg:"Account created successfully"})
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
}

const sendUserDetails = async(req, res) => {
  try {
    const formData = req.body;
    await sendNotaryMail('gaganraj.dev05@gmail.com', formData);
    return res.status(200).json({success:false,msg:"successfull sent notary details"});
  }
  catch(err) {
    console.log(err.message);
    return res.status(500).json({success:false, msg:"Some error occured please try again later"});
  }
}

module.exports = { sendOtpToPhone, verifyOtp, notarySignup, validateEmailOtp,getEmailOtp, sendUserDetails };
