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
        if (!data)
            throw new Error('No users found.');

        // Remove passwords and filter out users of type 'admin'
        const modifiedData = data
            .filter(user => user.type !== 'admin')
            .map(user => {
                const { password, ...userWithoutPassword } = user.toObject();
                return userWithoutPassword;
            });
        res.send(modifiedData);

    } catch (error) {
        console.error('Error getting users:', error);
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}

const getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await UserModel.findById(id);
        if (!data)
            return handleHttpError(res, 'ERROR_USER_NOT_FOUND');

        const { password, ...userWithoutPassword } = data.toObject(); // Remueve la contraseña de la respuesta
        res.send(userWithoutPassword);

    } catch (error) {
        console.error('Error getting user:', error);
        handleHttpError(res, 'ERROR_GET_ITEM_USERNAME');
    }
}

const updateItem = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const data = await UserModel.findByIdAndUpdate(userId, updatedUserData);
        if (!data)
            return handleHttpError(res, 'ERROR_USER_NOT_FOUND', 404);

        res.send(data);

    } catch (error) {
        console.error('Error updating user:', error);
        handleHttpError(res, 'ERROR_UPDATE_USER', 500);
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await UserModel.deleteOne({ _id: id });
        res.send(data);

    } catch (error) {
        console.error('Error updating user:', error);
        handleHttpError(res, 'ERROR_DELETE_USER', 500);
    }
}

module.exports = { getItems, getItemById, updateItem, deleteItem };
