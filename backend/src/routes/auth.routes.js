const { Router } = require('express');
const { signup, signin, signout, refreshToken } = require('../controllers/auth.controller');
const { signinSchema, signupSchema, validate } = require('../middlewares/validation.middleware')
const {auth } = require('../middlewares/auth.middleware');
const routes = new Router();

routes.post('/signup', validate(signupSchema), signup);
routes.post('/signin', validate(signinSchema), signin);

routes.use(auth);
//routes.get('/refresh-token', refreshToken);
routes.get('/signout', signout);

module.exports = routes;
