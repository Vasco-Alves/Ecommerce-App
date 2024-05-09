/**
 * Este archivo define las rutas para las operaciones de los comercios.
 */

const express = require('express');
const router = express.Router();

const Controller = require('../controllers/comercio');
const Validator = require("../validators/comercio");
const Middleware = require('../middleware/authenticateToken');

router.get('/', Controller.getItems);

router.get('/:cif', Validator.validateCif, Controller.getItemByCIF);

// (user auth)
router.post('/', Middleware.authUserToken, Validator.validateCreate, Controller.createItem);

// (commerce auth)
router.put('/:id', Middleware.authCommerceToken, Validator.validateCreate, Controller.updateItem);

// (commerce auth)
router.delete('/:cif', Middleware.authCommerceToken, Validator.validateCif, Controller.deleteItemByCIF);

module.exports = router;
