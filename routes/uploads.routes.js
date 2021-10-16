const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile, showFiles, returnFile, deleteFile } = require('../controllers/uploads.controller');

const { validateFileUpload } = require('../middlewares/file-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

// Upload file
router.post('/', [
    validateFileUpload,
    validateJWT
], uploadFile);

// Get files
router.get('/', showFiles);

router.get('/:fileName', returnFile);

// Delete file
router.delete('/:fileName', validateJWT, deleteFile);

module.exports = router;