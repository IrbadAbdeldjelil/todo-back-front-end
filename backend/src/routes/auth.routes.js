const { Router } = require('express');
const { signup, signin } = require('../controllers/auth.controller');
const { signinSchema, signupSchema, validate } = require('../middlewares/validation.middleware')
const routes = new Router();

routes.post('/signup', validate(signupSchema), signup);
routes.post('/signin', validate(signinSchema), signin);
// routes.delete('/', SessionController.store);

module.exports = routes;
