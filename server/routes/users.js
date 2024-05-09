/**
 * Este archivo define las rutas para las operaciones de los usuarios.
 */

const express = require('express');
const router = express.Router();

const Controller = require('../controllers/users');
const Validator = require('../validators/users');
const Middleware = require('../middleware/authenticateToken');

/**
 * @openapi
 * /api/items:
 *  get:
 *      tags:
 *      - Item
 *      summary: Get all items.
 *      description: Retrieves a list of all items.
 *      responses:
 *          '200':
 *              description: A list of items.
 *          '500':
 *              description: Server error.
 */
router.get('/', Controller.getItems);

/**
 * @openapi
 * /api/items/{id}:
 *  get:
 *      tags:
 *      - Item
 *      summary: Get item by ID.
 *      description: Retrieves a single item by its ID.
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the item.
 *      responses:
 *          '200':
 *              description: A single item.
 *          '404':
 *              description: Item not found.
 *          '500':
 *              description: Server error.
 */
router.get('/:id', Middleware.authUserToken, Validator.validateId, Controller.getItemById);

/**
 * @openapi
 * /api/items/{id}:
 *  put:
 *      tags:
 *      - Item
 *      summary: Update an item.
 *      description: Updates an existing item by its ID.
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the item to update.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Item'
 *      responses:
 *          '200':
 *              description: Updated item.
 *          '404':
 *              description: Item not found.
 *          '500':
 *              description: Server error.
 */
router.put('/:id', Middleware.authUserToken, Controller.updateItem);

/**
 * @openapi
 * /api/items/{id}:
 *  delete:
 *      tags:
 *      - Item
 *      summary: Delete an item.
 *      description: Deletes an item by its ID.
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the item to delete.
 *      responses:
 *          '200':
 *              description: Item deleted successfully.
 *          '404':
 *              description: Item not found.
 *          '500':
 *              description: Server error.
 */
router.delete('/:id', Middleware.authUserToken, Validator.validateId, Controller.deleteItem);

module.exports = router;
