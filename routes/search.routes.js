const { Router } = require('express');

const { searchUsers } = require('../controllers/search.controller');

const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { hasRole } = require('../middlewares/role-validator');

const router = Router();

// Search for users
router.get('/users/:term', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFields
], searchUsers);

module.exports = router;