/**
 * Conjunto de validaciones utilizando express-validator 
 * para verificar los campos de entrada al crear un comercio.
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Validador para la creación de un comercio. Todos los campos no deben ser vacios.
const validateCreate = [
    check("name").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("city").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("phone").exists().notEmpty(),
    check("page_id").exists().notEmpty().isNumeric(),
    check("description").exists().notEmpty(),
    check("reviews").isArray(),
    check("reviews.*").isString().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validateCreate };
