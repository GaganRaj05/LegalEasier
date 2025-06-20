const User = require('../models/User');
const {sendMail} = require('../utils/email');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Redis = require('ioredis');
const { emailLimiter } = require('../utils/limiters');
const redis = new Redis(process.env.REDIS_URL);
const {initializeUserSession, getUserSession, updateUserSession, deleteUserSession} = require('../utils/session')



const handleSignIn = async(req, res)=> {
    try {
        const {email, password} = req.body;
        const user_exists = await User.findOne({email});
        if(!user_exists) return res.status(400).json({success:false, msg:"No user exists create an account"});

        const verify = await bcrypt.compare(password, user_exists.password);
        if(!verify) return res.status(400).json({success:false,msg:"Incorrect password"});

        const userData = {
            name:user_exists.name,
            email:user_exists.email,
            user_name:user_exists.user_name
        }
        const token = jsonwebtoken.sign({userData}, process.env.JWT_SECRET,{expiresIn:'1h'});

        res.cookie('authtoken',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/',
            maxAge:3600000
        });
        return res.status(200).json({success:true, msg:"Login successfull", userData});

    }   
    catch(err) {
        console.log(err.message);
        return res.status(501).json({success:false,msg:"Some error occured please try again later"})
    }
}

const handleSignUp = async (req, res) => {
    try {
        const {name, user_name, password, address,email,acceptedTerms} = req.body;
        const user_exists = await User.findOne({user_name});
        if(user_exists) return res.status(400).json({success:false, msg:"Username taken please enter a new one"});
        const emailExists = await User.findOne({email});
        if(emailExists) return res.status(400).json({success:false, msg:"Email exists please login"});

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        await User.create({
            name,
            user_name,
            email,
            password:hashedPassword,
            address,
            acceptedTerms
        })

        return res.status(201).json({success:true, msg:"Account created successfully"});

    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
} 

const getOtp = async(req, res) => {
    try {
        const email = req.query.email;
        console.log(email)
        const userExists = await User.findOne({email});
        if(userExists) return res.status(401).json({success:false,msg:"Account exists, please use a different email "});
        const otp = Math.floor(100000 + Math.random() * 900000);

        const allowed = await emailLimiter(email);
        if(!allowed) return res.status(429).json({succcess:false, msg:"To many otp requests try again in few minutes"});

        await sendMail(email,otp);
        await redis.set(`otp:${email}`,otp,'EX',300);
        return res.status(200).json({success:true, msg:"Otp sent successfully"});
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
}


const validateOTP = async(req, res)=> {
    try {
        console.log(req.body);
        const {email, otp} = req.body;

        const savedOtp = await redis.get(`otp:${email}`);
        if(!savedOtp) {
            return res.status(400).json("Otp expired, please request a new one")
        }
        if(savedOtp !== otp) {
            return res.status(400).json({success:false, msg:"Incorrect otp entered"});
        }
        await redis.del(`otp:${email}`)
        return res.status(200).json({success:true, msg:"Email verified successfully"});

    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
}

const checkAuth = async(req, res) => {
    try {
        const token = req.cookies?.authtoken;
        if(!token) return res.status(400).json({success:false,msg:"Not loggedIn"});

        const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        if(!verify) return res.status(400).json({success:false,msg:"Your session has expired please re-login"});
        const user = await User.findOne({email:verify.userData.email});
        const userData = {
            name:user.name,
            email:user.email,
            user_name:user.user_name
        }
        return res.status(200).json({success:true,msg:"LoggedIn",userData});
    }
    catch(err) {
                if (err instanceof jsonwebtoken.TokenExpiredError) {
            return res.status(401).json({ 
                success: false, 
                msg: "Session expired. Please log in again.",
                code: "TOKEN_EXPIRED" 
            });
        }
        
        
        if (err instanceof jsonwebtoken.JsonWebTokenError) {
            return res.status(401).json({ 
                success: false, 
                msg: "Invalid authentication token",
                code: "INVALID_TOKEN"
            });
        }

        console.error("Authentication error:", err.message);
        return res.status(500).json({ 
            success: false, 
            msg: "Internal server error",
            code: "SERVER_ERROR"
        });

    }
}


module.exports  = {getOtp, handleSignIn, handleSignUp,validateOTP,checkAuth};