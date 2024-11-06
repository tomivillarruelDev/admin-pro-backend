/*
    Path: '/api/doctors'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} = require('../controllers/doctors');

const router = Router();

router.get('/', getDoctors);

router.post(
    '/',
    [
        validateJWT,
        check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('name', 'El id del hospital debe ser valido').isMongoId(),
        validateFields,
    ],
    createDoctor
);

router.put('/:id', validateJWT, updateDoctor);

router.delete('/:id', validateJWT, deleteDoctor);

module.exports = router;
