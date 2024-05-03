/**
 * Conjunto de validaciones utilizando express-validator 
 * para verificar los campos de entrada al crear un usuario.
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Validador para la creación de un comercio. Todos los campos no deben ser vacios.
const validateRegister = [
    check('type').notEmpty(),
    check('username').notEmpty(),
    check('email').isEmail(),
    check('password').notEmpty(),
    check('age').optional().isInt(),
    check('gender').optional(),
    check('city').notEmpty(),
    check('interests').optional().isArray(),
    check('enableOffers').optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validateRegister };
