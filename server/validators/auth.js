/**
 * Conjunto de validaciones utilizando express-validator 
 * para verificar los campos de entrada al crear un usuario.
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const register = [
    check('type').notEmpty(),
    check('username').notEmpty(),
    check('email').isEmail(),
    check('password').notEmpty().isLength({ min: 8, max: 16 }),
    check('age').optional().isInt(),
    check('gender').optional(), // TODO mandatory
    check('city').notEmpty(),
    check('interests').optional().isArray(),
    check('enableOffers').optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const login = [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty(), // .isLength( {min:8, max: 16} ),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { register, login };
