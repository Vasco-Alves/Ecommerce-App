/**
 * Controladores para realizar operaciones en 
 * la base de datos para el Comercio.
 */

const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

const User = require('../models/user');

/** Obtiene todos los comercios en la base de datos */
const getItems = async (req, res) => {
    try {
        const data = await User.find();
        // Remueve las contraseñas de cada usuario para la respuesta
        const modifiedData = data.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });
        res.send(modifiedData);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}

/** Obtiene un solo comercio con un CIF específico */
const getItemByName = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user)
            return handleHttpError(res, 'ERROR_USER_NOT_FOUND');

        const { password, ...userWithoutPassword } = user.toObject(); // Remueve la contraseña de la respuesta

        res.send(userWithoutPassword);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM_USERNAME');
    }
}

const updateItem = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Exporta los controladores para ser utilizados en otras partes de la aplicación
module.exports = { getItems, getItemByName, updateItem };
