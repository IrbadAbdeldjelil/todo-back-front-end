const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15*60*1000,//15m
    max: 100,
    message: 'too many request from this ip'
});

module.exports = { limiter };