/**
 * Controladores para realizar operaciones en 
 * la base de datos para el Comercio.
 */

const { handleHttpError } = require('../utils/handleError');

const UserModel = require('../models/user');

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

    } catch (error) {
        console.error('Error getting users:', error);
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}

/** Obtiene un solo comercio con un CIF específico */
const getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (!user)
            return handleHttpError(res, 'ERROR_USER_NOT_FOUND');

        const { password, ...userWithoutPassword } = user.toObject(); // Remueve la contraseña de la respuesta
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

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData);
        if (!updatedUser)
            return handleHttpError(res, 'ERROR_USER_NOT_FOUND', 404);

        res.send('');

    } catch (error) {
        console.error('Error updating user:', error);
        handleHttpError(res, 'ERROR_UPDATE_USER', 500);
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await UserModel.deleteOne({ _id: id });
        res.send(data)
    } catch (error) {
        console.error('Error updating user:', error);
        handleHttpError(res, 'ERROR_DELETE_USER', 500);
    }
}

module.exports = { getItems, getItemById, updateItem, deleteItem };
