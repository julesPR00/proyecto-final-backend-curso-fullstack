const fs = require('fs')
const path = require('path');

const { response } = require("express");

const File = require('../models/file.model');

const { uploadFileHelper } = require('../helpers/upload-file');

const User = require('../models/user.model');

const uploadFile = async (req, res = response) => {
    try {
        const fileName = await uploadFileHelper(req.files, undefined, 'files');

        console.log('ok', fileName);

        const file = new File({ fileName, user: req.user._id });

        // Save in db
        await file.save();

        file.createdAt;

        res.json(file);
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

module.exports = {
    uploadFile
}