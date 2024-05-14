/**
 * Este archivo define un esquema de Mongoose para el modelo de un usuario.
 * El esquema especifica la estructura de los datos que serán almacenados en la base de datos MongoDB.
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number
        },
        gender: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        interests: [{
            type: String
        }],
        enableOffers: {
            type: Boolean
        }
    },
    {
        // Opciones adicionales del esquema
        timestamps: true, // Agregar campos 'createdAt' y 'updatedAt' automáticamente
        versionKey: false // No incluir el campo '__v' por defecto
    }
);

// Exportar el modelo de usuario creado a partir del esquema
module.exports = mongoose.model('user', UserSchema);
