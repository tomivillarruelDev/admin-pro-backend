const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
    }

    //Verificar el token
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET); //el uid esta grabado en el payload del token

        req.uid = uid;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
    next();
};

module.exports = {
    validateJWT,
};
