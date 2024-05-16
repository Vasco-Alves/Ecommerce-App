
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const UserController = require('../controllers/users');
const CommerceController = require('../controllers/comercio');
const AuthValidator = require('../validators/auth');
const CommerceValidator = require('../validators/comercio');
const Middleware = require('../middleware/authenticateToken');

router.get('/users', Middleware.authUserToken, AuthController.getUsers);

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user.
 *     description: Registers a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '500':
 *         description: Server error.
 */
router.post('/register', AuthValidator.register, AuthController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login.
 *     description: Logs in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Not found.
 *       '500':
 *         description: Server error.
 */
router.post('/login', AuthValidator.login, AuthController.login);

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
router.put('/commerce/:id', Middleware.authUserToken, CommerceValidator.validateCreate, CommerceController.updateItem);

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
router.delete('/users/:id', Middleware.authUserToken, UserController.deleteItem);

module.exports = router;
