
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (model) => {
    const sign = jwt.sign(
        {
            _id: model._id,
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sign;
}

const signCommerceToken = async (commerce) => {
    const sign = jwt.sign(
        {
            _id: commerce._id,
            cif: commerce.cif
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sign;
}

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { tokenSign, signCommerceToken, verifyToken };