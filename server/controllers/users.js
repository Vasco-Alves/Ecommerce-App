/**
 * Controladores para realizar operaciones en 
 * la base de datos para usuarios.
 */

const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

const UserModel = require('../models/user');

const getItems = async (req, res) => {
    try {
        const data = await UserModel.find();

        // Remove passwords and filter out users of type 'admin'
        const modifiedData = data
            .filter(user => user.type !== 'admin')
            .map(user => {
                const { password, ...userWithoutPassword } = user.toObject();
                return userWithoutPassword;
            });
        res.send(modifiedData);

    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}

const getItemById = async (req, res) => {
    try {
        req = matchedData(req);
        const id = req.id;

        const data = await UserModel.findById(id);
        if (!data)
            return handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);

        const { password, ...userWithoutPassword } = data.toObject(); // Remueve la contraseña de la respuesta
        res.send(userWithoutPassword);

    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM_USERNAME');
    }
}

const updateItem = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const data = await UserModel.findByIdAndUpdate(userId, updatedUserData);
        if (!data)
            return handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);

        res.send(data);

    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_USER');
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await UserModel.deleteOne({ _id: id });
        if (!data)
            return handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);
        res.send(data);

    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_USER');
    }
}

module.exports = { getItems, getItemById, updateItem, deleteItem };
