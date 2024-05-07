
const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJWT")

const UsersModel = require("../models/user")

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token)
            return handleHttpError(res, "TOKEN_NOT_FOUND", 401);

        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token);
        if (!dataToken._id)
            return handleHttpError(res, "ERROR_ID_TOKEN", 401);

        const user = await UsersModel.findById(dataToken._id);
        req.user = user;
        next();

    } catch (err) {
        handleHttpError(res, "SESSION_ERROR", 401);
    }
}

module.exports = authenticateToken;