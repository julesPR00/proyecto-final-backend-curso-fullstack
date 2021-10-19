const fs = require('fs')
const path = require('path');

const { response } = require("express");

const File = require('../models/file.model');

const { uploadFilesHelper } = require('../helpers/upload-file');

const uploadFiles = async (req, res = response) => {
    try {
        const directory = 'files';

        let fileNames;
        if (!Array.isArray(req.files.fileName)) {
            fileNames = await uploadFilesHelper([req.files.fileName], undefined, directory);
        } else {
            fileNames = await uploadFilesHelper(req.files.fileName, undefined, directory);
        }

        // const pathName = process.env.HOST + ':' + process.env.PORT + '/api/uploads/' + directory + '/';

        let filesIn = [];

        fileNames.forEach((name, index) => {
            const fileN = new File({
                fileName: name,
                // pathName,
                user: req.user._id
            });
            fileN.createdAt;
            filesIn[index] = fileN;
        });
        File.insertMany(filesIn);

        res.json({ filesIn });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const showFiles = async (req, res = response) => {
    const { limit = 15, from = 0 } = req.query;
    const [total, files] = await Promise.all([
        File.countDocuments(),
        File.find()
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        files
    });
}

// const returnFile = async (req, res = response) => {
//     const { fileName } = req.params;

//     const fileEx = await File.find({ fileName });

//     if (!fileEx) {
//         return res.status(400).json({
//             msg: `File ${fileName} does not exist in db`
//         });
//     }

//     const pathFile = path.join(__dirname, '../uploads/files/', fileName);
//     if (fs.existsSync(pathFile)) {
//         return res.sendFile(pathFile);
//     }

//     return res.status(400).json({
//         msg: `Cannot find file ${fileName} on server`
//     });
// }

const deleteFile = async (req, res = response) => {
    const { fileName } = req.params;

    // Delete entirely from db
    const fileEx = await File.findOne({ fileName });

    if (!fileEx) {
        return res.status(400).json({
            msg: `File ${fileName} does not exist in db`
        });
    }

    if (!fileEx.user.equals(req.user._id)) {
        return res.status(400).json({
            msg: `File ${fileName} cannot be deleted by user`
        });
    }

    const pathFile = path.join(__dirname, '../uploads/files/', fileName);
    if (fs.existsSync(pathFile)) {
        await File.findOneAndDelete({ fileName });
        fs.unlinkSync(pathFile);
    }

    res.json(fileEx);
}

module.exports = {
    uploadFiles,
    showFiles,
    // returnFile,
    deleteFile
}