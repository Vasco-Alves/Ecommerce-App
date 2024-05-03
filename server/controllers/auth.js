
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
        const dataUser = await User.create(body);
        dataUser.set('password', undefined, { strict: false });

        const data = { token: await tokenSign(dataUser), user: dataUser }
        res.send(data);

    } catch (error) {
        console.error(error);
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

/** Realiza el login de un usuario. */
const loginCtrl = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = { registerCtrl, loginCtrl };