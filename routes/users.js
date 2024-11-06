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
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//controlador que se ejecutara cuando se acceda a la ruta

router.get('/', validateJWT, getUsers);

router.post(
    '/',
    [
        check('name').not().isEmpty().withMessage('El nombre es obligatorio'), //validacion del nombre
        check('password')
            .not()
            .isEmpty()
            .withMessage('La contraseña es obligatoria'), //validacion de la contraseña
        check('email').isEmail().withMessage('El correo no es valido'), //validacion del correo
        validateFields, //middleware personalizado para validar los campos
    ],
    createUser
);

router.put(
    '/:id',
    [
        validateJWT, //middleware para validar el token
        check('name').not().isEmpty().withMessage('El nombre es obligatorio'), //validacion del nombre
        check('email').isEmail().withMessage('El correo no es valido'), //validacion del correo
        validateFields,
    ],
    updateUser
);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
