
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const AuthValidator = require("../validators/auth");

router.post('/register', AuthValidator.register, AuthController.register);

router.post('/login', AuthValidator.login, AuthController.login);

module.exports = router;
