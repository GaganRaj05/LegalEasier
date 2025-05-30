const rateLimit = require('express-rate-limit');
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => console.log('Redis connected'));
redis.on('ready', () => console.log('Redis ready'));
redis.on('error', (err) => console.error('Redis error:', err));
redis.on('close', () => console.log('Redis connection closed'));
redis.on('reconnecting', () => console.log('Redis reconnecting'));
const PHONE_LIMIT = 15;
const WINDOW_SECONDS=60*60;

const otpLimiter = rateLimit({
    windowMs:10*60*1000,
    max:15,
    message:{
        status:429,
        error:"To may requests, please try again after 5 minutes"
    },
    standardHeaders:true,
    legacyHeaders:false
})


const checkPhoneRateLimit = async(phoneNumber) => {
    const key = `otp-limit:${phoneNumber}`;
    const current = await redis.get(key);
    if(current && parseInt(current)>= PHONE_LIMIT) {
        return false;
    }
    if(current) {
        await redis.incr(key);
    }
    else {
        await redis.set(key,1,'EX',WINDOW_SECONDS,'NX');
    }
    return true 
    
}

const emailLimiter = async(email) => {
    const current = await redis.get(`email-limit:${email}`);
    if(current && parseInt(current)>=PHONE_LIMIT) return false;
    if(current) {
        await redis.incr(`email-limit:${email}`);
    }
    else {
        await redis.set(`email-limit:${email}`,1,'EX',WINDOW_SECONDS, 'NX');
    }
    return true;
}

module.exports = {checkPhoneRateLimit, otpLimiter, emailLimiter};