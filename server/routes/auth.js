
const express = require('express');
const router = express.Router();

const Controller = require('../controllers/auth');
const Validator = require("../validators/auth");

router.post('/register', Validator.register, Controller.register);

router.post('/login', Validator.login, Controller.login);

module.exports = router;
