/**
 * Este archivo define un esquema de Mongoose para el modelo de un comercio.
 * El esquema especifica la estructura de los datos que serán almacenados en la base de datos MongoDB.
 */

// Importar el módulo Mongoose para definir esquemas y modelos
const mongoose = require('mongoose');

const CommerceSchema = new mongoose.Schema(
    {
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
        // Dirección del comercio
        direccion: {
            type: String,
            required: true
        },
        // Correo electrónico del comercio
        email: {
            type: String,
            required: true
        },
        // Número de teléfono de contacto del comercio
        telefonoContacto: {
            type: String,
            required: true
        },
        // Identificador de la página asociada al comercio
        idPagina: {
            type: Number,
            required: true
        },
        // Descripción del comercio
        description: {
            type: String,
            required: true
        },
        // Lista de reseñas del comercio (opcional)
        reviews: [{
            type: String
        }]
    },
    {
        // Opciones adicionales del esquema
        timestamps: true, // Agregar campos 'createdAt' y 'updatedAt' automáticamente
        versionKey: false // No incluir el campo '__v' por defecto
    }
);

// Exportar el modelo de comercio creado a partir del esquema
module.exports = mongoose.model('comercio', CommerceSchema);
