const fs = require('fs')
const path = require('path');

const { response } = require("express");

const { uploadFileHelper } = require('../helpers/upload-file');

const User = require('../models/user.model');

const uploadFile = async (req, res = response) => {
    try {
        const fileName = await uploadFileHelper(req.files, undefined, '');
        res.json({ fileName });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

module.exports = {
    uploadFile
}