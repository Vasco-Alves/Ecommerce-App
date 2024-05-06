/**
 * Este archivo define las rutas para las operaciones de los usuarios.
 */

const express = require('express'); // Importar el módulo 'express' para manejar las rutas
const router = express.Router(); // Crear un enrutador para manejar las rutas

const Controller = require('../controllers/users'); // Controlador
// const Validator = require("../validators/comercio"); // Validador

/* GET requests */

// Obtiene la lista de usuarios.
router.get('/', Controller.getItems);

// Obtiene un solo usuario usando su nombre de perfil.
router.get('/:username', Controller.getItemByName);

/* PUT requests */

router.put('/:username', Controller.updateItem);

module.exports = router;
