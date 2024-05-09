/**
 * Este archivo define las rutas para las operaciones de los usuarios.
 */

const express = require('express');
const router = express.Router();

const Controller = require('../controllers/users');
const Validator = require('../validators/users');
const Middleware = require('../middleware/authenticateToken');

router.get('/', Controller.getItems);

// (user auth)
router.get('/:id', Middleware.authUserToken, Validator.validateId, Controller.getItemById);

// (user auth)
router.put('/:id', Middleware.authUserToken, Controller.updateItem);

// (user auth)
router.delete('/:id', Middleware.authUserToken, Validator.validateId, Controller.deleteItem);

module.exports = router;
