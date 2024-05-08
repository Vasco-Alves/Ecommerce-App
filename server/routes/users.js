/**
 * Este archivo define las rutas para las operaciones de los usuarios.
 */

const express = require('express'); // Importar el módulo 'express' para manejar las rutas
const router = express.Router(); // Crear un enrutador para manejar las rutas

const Controller = require('../controllers/users');
const Validator = require('../validators/users');
const authenticateToken = require('../middleware/authenticateToken');

// GET all users (requires authentication)
router.get('/', authenticateToken, Controller.getItems);

// GET user by id (requires authentication)
router.get('/:id', authenticateToken, Validator.validateId, Controller.getItemById);

// PUT user by id (requires authentication)
router.put('/:id', authenticateToken, Controller.updateItem);

// DELETE user by id (requires authentication)
router.delete('/:id', Validator.validateId, Controller.deleteItem);

module.exports = router;
