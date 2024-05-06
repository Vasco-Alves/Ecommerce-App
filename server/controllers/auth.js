
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

const { tokenSign } = require("../utils/handleJWT");
const { encrypt, compare } = require("../utils/handlePassword");

const User = require('../models/user');

/** Registra un usuario en la base de datos. */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);

        const password = await encrypt(req.password);
        const body = { ...req, password };
        const user = await User.create(body);
        // dataUser.set('password', undefined, { strict: false }); // Remueve password de la respuesta

        const data = {
            token: await tokenSign(user),
            user: user.username
        };
        res.send(data);

    } catch (error) {
        console.error(error);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

/** Realiza el login de un usuario. */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);

        const user = await User.findOne({ email: req.email });
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
        console.error(error);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = { registerCtrl, loginCtrl };