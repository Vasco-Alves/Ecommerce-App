/**
 * Este archivo define las rutas para las operaciones de los comercios.
 */

const express = require('express'); // Importar el módulo 'express' para manejar las rutas
const router = express.Router(); // Crear un enrutador para manejar las rutas

const Controller = require('../controllers/comercio'); // Controlador
const Validator = require("../validators/comercio"); // Validador

/* GET requests */

// Obtiene la lista de comercios.
router.get('/', Controller.getItems);

// Obtiene un solo comercio mediante su número de CIF.
router.get('/:cif', Controller.getItemByCIF);

/* POST requests */

// Crea un nuevo item de comercio, validando los datos de entrada.
router.post('/', Validator.validateCreate, Controller.createItem);

/* PUT requests */

// Actualiza un comercio existente mediante su número de CIF.
router.put('/:cif', Validator.validateCreate, Controller.updateItem);

/* DELETE requests */

// Elimina un comercio existente mediante su número de CIF.
router.delete('/:cif', Controller.deleteItem);

module.exports = router;
