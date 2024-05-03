
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            email: user.email
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
        console.log(error)
    }
}

module.exports = { tokenSign, verifyToken };