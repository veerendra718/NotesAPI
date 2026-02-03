const rateLimiter = require('express-rate-limit');

const CreateNoteLimiter = rateLimiter({
    windowMs: 60 * 1000,
    max: 5,
    message: { message: 'Too many notes created, please try again later' },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = CreateNoteLimiter;
