const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile } = require('../controllers/uploads.controller');

const { validateFileUpload } = require('../middlewares/file-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

// Upload file
router.post('/', [
    validateFileUpload,
    validateJWT
], uploadFile);

// Get files

module.exports = router;