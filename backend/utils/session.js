const Redis = require('ioredis');
const crypto = require('crypto');
const redis = new Redis(process.env.REDIS_URL);

const initializeUserSession = async (userId) => {
    const session = {
        flow: 'common_intake',
        step: 'name',
        data: {},
        path: null
    };
    await redis.set(`session:${userId}`, JSON.stringify(session));
};

const getUserSession = async (userId) => {
    const session = await redis.get(`session:${userId}`);
    return session ? JSON.parse(session) : null;
};

const updateUserSession = async (userId, updates) => {
    const currentSession = await getUserSession(userId);
    const updatedSession = { ...currentSession, ...updates };
    await redis.set(`session:${userId}`, JSON.stringify(updatedSession));
};

const deleteUserSession = async (userId) => {
    await redis.del(`session:${userId}`);
};

const generateUserId = () => {
    const sixDigit = crypto.randomInt(100000, 999999);
    return sixDigit.toString();
};

module.exports = {
    initializeUserSession,
    getUserSession,
    updateUserSession,
    deleteUserSession,
    generateUserId
};