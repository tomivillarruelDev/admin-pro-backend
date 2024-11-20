const { response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
    next();
};

const validateADMIN_ROLE = async (req, res  = response, next) => {

    const uid = req.uid;

    try {
        const userDB = await user.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción'
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado'
        });
    }

}

module.exports = {
    validateJWT,
    validateADMIN_ROLE
};