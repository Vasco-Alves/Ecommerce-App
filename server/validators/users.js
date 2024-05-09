/**
 * Conjunto de validaciones utilizando express-validator
 * para verificar los campos de entrada al crear un comercio.
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validateId = [
    check('id').notEmpty().withMessage('ID is required'),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


module.exports = { validateId };
