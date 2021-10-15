const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile } = require('../controllers/uploads.controller');

const { validateFileUpload } = require('../middlewares/file-validator');

const router = Router();

// Upload file
router.post('/',
    validateFileUpload,
    uploadFile);

// Get files

module.exports = router;