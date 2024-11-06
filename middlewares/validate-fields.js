const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => { // next es la siguiente funcion que se ejecutara cuando termine el middleware

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next(); //si no hay errores, se ejecuta la siguiente funcion
}

module.exports = {
    validateFields
}