/**
 * Este archivo define las rutas para las operaciones de los comercios.
 */

const express = require('express');
const router = express.Router();

const Controller = require('../controllers/comercio');
const Validator = require("../validators/comercio");
const Middleware = require('../middleware/authenticateToken');

/**
 * @openapi
 * /api/comercio:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get all commerce items.
 *      description: Retrieves a list of all commerce items.
 *      responses:
 *          '200':
 *              description: A list of commerce items.
 *          '500':
 *              description: Server error.
 */
router.get('/', Controller.getItems);

/**
 * @openapi
 * /api/comercio/{cif}:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get commerce item by CIF.
 *      description: Retrieves a single commerce item by its CIF.
 *      parameters:
 *      - in: path
 *        name: cif
 *        schema:
 *          type: string
 *        required: true
 *        description: CIF of the commerce item.
 *      responses:
 *          '200':
 *              description: A single commerce item.
 *          '404':
 *              description: Commerce item not found.
 *          '500':
 *              description: Server error.
 */
router.get('/:cif', Validator.validateCif, Controller.getItemByCIF);

/**
 * @openapi
 * /api/comercio:
 *  post:
 *      tags:
 *      - Commerce
 *      summary: Create a new commerce item.
 *      description: Creates a new commerce item.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Commerce'
 *      responses:
 *          '200':
 *              description: Token for the created commerce.
 *          '500':
 *              description: Server error.
 */

router.post('/', Middleware.authUserToken, Validator.validateCreate, Controller.createItem);

/**
 * @openapi
 * /api/comercio/{id}:
 *  put:
 *      tags:
 *      - Commerce
 *      summary: Update a commerce item.
 *      description: Updates an existing commerce item by its ID.
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the commerce item to update.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Commerce'
 *      responses:
 *          '200':
 *              description: Updated commerce item.
 *          '404':
 *              description: Commerce item not found.
 *          '500':
 *              description: Server error.
 */
router.put('/:id', Middleware.authCommerceToken, Validator.validateCreate, Controller.updateItem);

/**
 * @openapi
 * /api/comercio/{cif}:
 *  delete:
 *      tags:
 *      - Commerce
 *      summary: Delete a commerce item.
 *      description: Deletes a commerce item by its CIF.
 *      parameters:
 *      - in: path
 *        name: cif
 *        schema:
 *          type: string
 *        required: true
 *        description: CIF of the commerce item to delete
 *      responses:
 *          '200':
 *              description: Commerce item deleted successfully.
 *          '404':
 *              description: Commerce item not found.
 *          '500':
 *              description: Server error.
 */
router.delete('/:cif', Middleware.authCommerceToken, Validator.validateCif, Controller.deleteItemByCIF);

module.exports = router;
