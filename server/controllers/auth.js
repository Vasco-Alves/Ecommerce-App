/**
 * Controladores para realizar operaciones en 
 * la base de datos para usuarios.
 */

const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { tokenSign } = require("../utils/handleJWT");
const { encrypt, compare } = require("../utils/handlePassword");

const UserModel = require('../models/user');

const getUsers = async (req, res) => {
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

const register = async (req, res) => {
    try {
        req = matchedData(req);

        const password = await encrypt(req.password);
        const body = { ...req, password };
        const user = await UserModel.create(body);
        if (!user)
            throw new Error('Couldn\'t create user.');

        user.set('password', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user: user
        };
        res.send(data);

    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_USER");
    }
}

const login = async (req, res) => {
    try {
        req = matchedData(req);

        const user = await UserModel.findOne({ email: req.email });
        if (!user)
            return handleHttpError(res, 'ERROR_USER_NOT_FOUND', 404);

        const checkPass = await compare(req.password, user.password);
        if (!checkPass)
            return handleHttpError(res, 'INVALID_PASSWORD', 401);

        const data = {
            token: await tokenSign(user),
            user: user.username,
            type: user.type
        };
        res.send(data);

    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = { getUsers, register, login };