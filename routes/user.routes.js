const { Router } = require('express');
const { check } = require('express-validator');

const { emailExists, existsUserById } = require('../helpers/db-validators');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/user.controllers');

const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { hasRole } = require('../middlewares/role-validator');

const router = Router();

// Get users    - return users
router.get('/', usersGet);

// Post user    - add user in db
router.post('/', [
    check('firstName', 'Firt Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be more than 8 digits').isLength({ min: 8 }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(emailExists),
    check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usersPost);

// Put user     - update user
router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existsUserById),
    check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usersPut);

// Delete user  - change state
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existsUserById),
    validateFields
], usersDelete);

module.exports = router;