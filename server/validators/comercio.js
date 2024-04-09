/**
 * Conjunto de validaciones utilizando express-validator 
 * para verificar los campos de entrada al crear un comercio.
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Validador para la creación de un comercio. Todos los campos no deben ser vacios.
const validateCreate = [
    check('page_id').notEmpty(),
    check('name').notEmpty(),
    check('cif').notEmpty(),
    check('city').notEmpty(),
    check('email').isEmail(),
    check('phone').notEmpty(),
    check('cover').optional().notEmpty(), //.isURL()
    check('description').notEmpty(),
    check('activity').notEmpty(),
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

module.exports = { validateCreate };
