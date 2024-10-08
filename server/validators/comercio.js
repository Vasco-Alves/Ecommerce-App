/**
 * Conjunto de validaciones utilizando express-validator 
 * para verificar los campos de entrada al crear un comercio.
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validateCif = [
    check('cif').notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validateCreate = [
    check('name').notEmpty(),
    check('cif').notEmpty(),
    check('city').notEmpty(),
    check('email').notEmpty().isEmail(),
    check('phone').notEmpty(),
    check('cover').optional(), //.isURL()
    check('description').optional(),
    check('activity').optional(),
    check('images').optional().isArray(),
    check('images.*').optional().isURL(),
    check('reviews').optional().isArray(),
    check('reviews.*').optional().isString(),
    check('score').optional().isNumeric(),
    check('upvotes').optional().isNumeric(),
    check('downvotes').optional().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validateCif, validateCreate };
