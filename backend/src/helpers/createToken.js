const { sign, decode} = require('jsonwebtoken');

module.exports.createToken = function (payload) {
    const accessToken = sign(
        payload, 
        process.env.JWT_ACCESS_SECRET, 
        {expiresIn: process.env.JWT_ACCESS_EXP});
    
        return { accessToken }
}