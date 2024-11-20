/* 
    Ruta: "/api/users"
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');
const { validateJWT, validateADMIN_ROLE, validateSameUser } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [validateJWT, validateADMIN_ROLE], getUsers);

router.post(
    '/',
    [
        check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('password')
            .not()
            .isEmpty()
            .withMessage('La contraseña es obligatoria'),
        check('email').isEmail().withMessage('El correo no es valido'),
        validateFields,
    ],
    createUser
);

router.put(
    '/:id',
    [
        validateJWT,
        validateSameUser,
        check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('email').isEmail().withMessage('El correo no es valido'),
        validateFields,
    ],
    updateUser
);

router.delete('/:id', [validateJWT, validateADMIN_ROLE], deleteUser);

module.exports = router;
