/**
 * Este archivo define un esquema de Mongoose para el modelo de un comercio.
 * El esquema especifica la estructura de los datos que serán almacenados en la base de datos MongoDB.
 */

const mongoose = require('mongoose');

const CommerceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cif: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        cover: {
            type: String
        },
        description: {
            type: String,
        },
        activity: {
            type: String,
        },
        images: [{
            type: String
        }],
        reviews: [{
            type: String
        }],
        score: {
            type: Number
        },
        upvotes: {
            type: Number
        },
        downvotes: {
            type: Number
        }
    },
    {
        // Opciones adicionales del esquema
        timestamps: true, // Agregar campos 'createdAt' y 'updatedAt' automáticamente
        versionKey: false // No incluir el campo '__v' por defecto
    }
);

// Exportar el modelo de comercio creado a partir del esquema
module.exports = mongoose.model('comercio', CommerceSchema);
