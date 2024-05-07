/**
 * Controladores para realizar operaciones en 
 * la base de datos para el Comercio.
 */

const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

const CommerceModel = require('../models/comercio');

/** Obtiene todos los comercios en la base de datos */
const getItems = async (req, res) => {
    try {
        const data = await CommerceModel.find();
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}

/** Obtiene un solo comercio con un CIF específico */
const getItemByCIF = async (req, res) => {
    try {
        const cif = req.params.cif;
        const data = await CommerceModel.findOne({ cif });
        if (!data)
            return handleHttpError(res, 'ERROR_COMERCIO_NOT_FOUND');

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM_CIF');
    }
}

/** Crea un nuevo comercio en la base de datos */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req); // Valida los datos
        const data = await CommerceModel.create(body); // Crear un nuevo comercio con los datos proporcionados
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}

/** Actualiza un comercio existente en la base de datos */
const updateItem = async (req, res) => {
    try {
        const body = matchedData(req); // Valida los datos
        const cif = req.params.cif; // Obtiene el CIF del comercio desde los parámetros de la solicitud
        const data = await CommerceModel.findOneAndUpdate({ cif: cif }, body, { new: true }); // Busca y actualiza el comercio con el CIF proporcionado

        // Si no encuentra el comercio devuelve error.
        if (!data)
            return handleHttpError(res, 'ERROR_COMERCIO_NOT_FOUND');

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }
}

/** Elimina un comercio de la base de datos */
const deleteItem = async (req, res) => {
    try {
        const cif = req.params.cif; // Obtiene el cif desde la solicitud
        const tipo = req.query.tipo; // Obtiene el tipo de eliminación

        console.log(tipo);

        // Tipos de eliminación permitidos
        const allowedTipos = ['logico', 'fisico'];
        // Validar que el tipo de eliminación especificado sea válido
        if (!allowedTipos.includes(tipo))
            return handleHttpError(res, 'ERROR_INVALID_TIPO');

        let data;

        // Realizar la eliminación lógica o física según el tipo especificado
        if (tipo === 'logico')
            data = await CommerceModel.deleteOne({ cif: cif });
        else if (tipo === 'fisico')
            data = await CommerceModel.findOneAndDelete({ cif: cif });

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_DELTE_ITEMS');
    }
}

// Exporta los controladores para ser utilizados en otras partes de la aplicación
module.exports = { getItems, getItemByCIF, createItem, updateItem, deleteItem };
