/**
 * Este archivo define un esquema de Mongoose para el modelo de un comercio.
 * El esquema especifica la estructura de los datos que serán almacenados en la base de datos MongoDB.
 */

// Importar el módulo Mongoose para definir esquemas y modelos
const mongoose = require('mongoose');

const CommerceSchema = new mongoose.Schema(
    {
        // Identificador de la página asociada al comercio
        page_id: {
            type: String,
            required: true
        },
        // Nombre del comercio
        name: {
            type: String,
            required: true
        },
        // Número de identificación fiscal del comercio
        cif: {
            type: String,
            required: true
        },
        // Ciudad del comercio
        city: {
            type: String,
            required: true
        },
        // Correo electrónico del comercio
        email: {
            type: String,
            required: true
        },
        // Número de teléfono de contacto del comercio
        phone: {
            type: String,
            required: true
        },
        // Foto de fondo
        cover: {
            type: String
        },
        // Descripción del comercio
        description: {
            type: String,
            required: true
        },
        // Actividad del comercio
        activity: {
            type: String,
            required: true
        },
        // Imágenes adicionales del comercio
        images: [{
            type: String
        }],
        // Lista de reseñas del comercio (opcional)
        reviews: [{
            type: String
        }],
        // Puntuación total
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
