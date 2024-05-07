/**
 * Este archivo define las rutas para las operaciones de los comercios.
 */

const express = require('express'); // Importar el módulo 'express' para manejar las rutas
const router = express.Router(); // Crear un enrutador para manejar las rutas

const CommerceController = require('../controllers/comercio'); // Controlador
const CommerceValidator = require("../validators/comercio"); // Validador

// Obtiene la lista de comercios.
router.get('/', CommerceController.getItems);

// Obtiene un solo comercio mediante su número de CIF.
router.get('/:cif', CommerceValidator.validateCif, CommerceController.getItemByCIF);

// Crea un nuevo item de comercio, validando los datos de entrada.
router.post('/', CommerceValidator.validateCreate, CommerceController.createItem);

// Actualiza un comercio existente mediante su número de CIF.
router.put('/:cif', CommerceValidator.validateCreate, CommerceController.updateItem);

// Elimina un comercio existente mediante su número de CIF.
router.delete('/:cif', CommerceValidator.validateCif, CommerceController.deleteItem);

module.exports = router;
