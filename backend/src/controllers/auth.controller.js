const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { User } = require('../models/relation.model');
const {sendResponse } = require('../helpers/responses');

// signup
module.exports.signup = async (req, res, next) => {
    
      const {username, email, password} = req.validated;
      const isUser = await User.findOne({where:{email}});
      if(isUser) throw createError(401, 'email already exists');
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({username, email, password: hashPassword});
      sendResponse(res, true, 201, 'user registered successfully', {username, email}, null);

}

//signin
module.exports.signin = async (req, res, next) => {
    
    const {email, password} = req.validated;
    const isUser = await User.findOne({where: {email}});
    if (!isUser) throw createError(401, 'Invalid email or password');
    if (!(await bcrypt.compare(password, isUser.password))) throw createError(401, 'Invalid password or email');
    sendResponse(res, true, 201, 'you signedin successfully', {username: isUser.username, email, id: isUser.id}, null);

}