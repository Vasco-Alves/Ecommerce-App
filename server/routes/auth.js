
const express = require('express'); // Importar el módulo 'express' para manejar las rutas
const router = express.Router(); // Crear un enrutador para manejar las rutas

const Controller = require('../controllers/auth'); // Controlador
const Validator = require("../validators/auth"); // Validador

/* POST requests */

router.post('/register', Validator.validateRegister, Controller.registerCtrl);

router.post('/login', Validator.validateLogin, Controller.loginCtrl);

module.exports = router;
