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
            return handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);

        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM_CIF');
    }
}

const getToken = async (req, res) => {
    try {
        req = matchedData(req);
        const cif = req.cif;
        const commerce = await CommerceModel.findOne({ cif });
        if (!commerce)
            return handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);

        const data = { token: await signCommerceToken(commerce) };
        res.send(data);

    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_TOKEN');
    }
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await CommerceModel.create(body);
        if (!data)
            throw new Error('Couldn\'t create commerce.');

        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEM');
    }
}

const updateItem = async (req, res) => {
    try {
        const body = matchedData(req);

        if (req.commerce._id != req.body._id)
            return handleHttpError(res, 'ERROR_FORBIDEN', 403);

        const data = await CommerceModel.findOneAndUpdate({ _id: req.body._id }, body);
        if (!data)
            return handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);

        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
}

const deleteItemByCIF = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await CommerceModel.deleteOne({ cif: body.cif });
        if (!data)
            return handleHttpError(res, 'ERROR_ITEM_NOT_FOUND', 404);
        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_DELTE_ITEM');
    }
}

module.exports = { getItems, getItemByCIF, getToken, createItem, updateItem, deleteItemByCIF };
