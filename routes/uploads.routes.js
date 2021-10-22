const { Router } = require('express');

const { uploadFiles, showFiles, returnFile, deleteFile } = require('../controllers/uploads.controller');

const { validateFileUpload } = require('../middlewares/file-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

// Upload file
router.post('/', [
    validateFileUpload,
    validateJWT
], uploadFiles);

// Get files
router.get('/', showFiles);

router.get('/:fileName', returnFile);

// Delete file
router.delete('/:fileName', validateJWT, deleteFile);

module.exports = router;