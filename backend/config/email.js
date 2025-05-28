const emailConfig = {
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true', 
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 5,
    tls: {
        rejectUnauthorized: false 
    }
};

module.exports = emailConfig;