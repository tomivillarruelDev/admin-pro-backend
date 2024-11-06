/*
    Path: "api/login"
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { login, googleSignIn, renewToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/',
    [
        check('email').isEmail().withMessage('El email es obligatorio'),
        check('password')
            .not()
            .isEmpty()
            .withMessage('El password es obligatorio'),
        validateFields,
    ],
    login
);

router.post(
    '/google',
    [
        check('token').not().isEmpty().withMessage('El token de Google es obligatorio'),
        validateFields,
    ],
    googleSignIn
);

router.get(
    '/renew',
    [
        check('token').not().isEmpty().withMessage('El token obligatorio'),
        validateJWT
    ],
    renewToken
);
module.exports = router;
