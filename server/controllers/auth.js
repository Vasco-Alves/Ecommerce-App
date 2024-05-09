/**
 * Controladores para realizar operaciones en 
 * la base de datos para usuarios.
 */

const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { tokenSign } = require("../utils/handleJWT");
const { encrypt, compare } = require("../utils/handlePassword");

const UsersModel = require('../models/user');

const register = async (req, res) => {
    try {
        req = matchedData(req);

        const password = await encrypt(req.password);
        const body = { ...req, password };
        const user = await UsersModel.create(body);
        if (!user)
            throw new Error('Couldn\'t create user');
        // dataUser.set('password', undefined, { strict: false }); // Remueve password de la respuesta

        const data = {
            token: await tokenSign(user),
            user: user.username
        };
        res.send(data);


    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

const login = async (req, res) => {
    try {
        req = matchedData(req);

        const user = await UsersModel.findOne({ email: req.email });
        if (!user)
            return handleHttpError(res, 'ERROR_USER_NOT_FOUND');

        const checkPass = await compare(req.password, user.password);
        if (!checkPass)
            return handleHttpError(res, 'INVALID_PASSWORD');

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

module.exports = { register, login };