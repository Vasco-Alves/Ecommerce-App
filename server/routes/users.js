/**
 * Este archivo define las rutas para las operaciones de los usuarios.
 */

const express = require('express'); // Importar el módulo 'express' para manejar las rutas
const router = express.Router(); // Crear un enrutador para manejar las rutas

const UserController = require('../controllers/users');
const UserValidator = require('../validators/users');
const authenticateToken = require('../middleware/authenticateToken');

/* GET requests */

// Gets all users (requires authentication)
router.get('/', authenticateToken, UserController.getItems);

// GET user by id (requires authentication)
router.get('/:id', authenticateToken, UserValidator.validateId, UserController.getItemById);

// PUT user by id (requires authentication)
router.put('/:id', authenticateToken, UserController.updateItem);

module.exports = router;
