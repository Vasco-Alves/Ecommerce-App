/**
 * Controladores para realizar operaciones en 
 * la base de datos para comercios.
 */

const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { signCommerceToken } = require("../utils/handleJWT");


const CommerceModel = require('../models/comercio');

const getItems = async (req, res) => {
    try {
        const data = await CommerceModel.find();
        if (!data)
            throw new Error('No commerces found.');
        res.send(data);

    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}

const getItemByCIF = async (req, res) => {
    try {
        const cif = req.params.cif;
        const data = await CommerceModel.findOne({ cif });
        if (!data)
            throw new Error('Commerce not found.');
        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM_CIF');
    }
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const commerce = await CommerceModel.create(body);
        if (!commerce)
            throw new Error('Couldn\'t create commerce.');

        const data = { token: await signCommerceToken(commerce) };
        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}

const updateItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await CommerceModel.findOneAndUpdate({ _id: req.body._id }, body);
        if (!data)
            throw new Error('Commerce not found.');

        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }
}

const deleteItemByCIF = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await CommerceModel.deleteOne({ cif: body.cif });
        if (!data)
            throw new Error('Commerce not found.');
        res.send(data);

        /*
        const cif = req.params.cif;
        const type = req.query.tipo;

        const allowedTypes = ['logico', 'fisico'];
        if (!allowedTypes.includes(type))
            throw new Error('Tipo invalido');

        let data;

        if (type === 'logico')
            data = await CommerceModel.deleteOne({ cif: cif });
        else if (type === 'fisico')
            data = await CommerceModel.findOneAndDelete({ cif: cif });

        res.send(data);
        */

    } catch (err) {
        handleHttpError(res, 'ERROR_DELTE_ITEMS');
    }
}

module.exports = { getItems, getItemByCIF, createItem, updateItem, deleteItemByCIF };
