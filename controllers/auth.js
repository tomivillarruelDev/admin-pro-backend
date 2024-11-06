const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        //Verificar email
        const dbUser = await User.findOne({ email });

        if (!dbUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido',
            });
        }

        //Verificar password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        //Nos pide la contraseña que ingreso el usuario y el hash que se encuentra en la base de datos. Hashea la contraseña y verifica si hacen match, los compara

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida',
            });
        }

        const token = await generateJWT(dbUser.id);

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
        });
    }
};

const googleSignIn = async (req, res = response) => {
    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const dbUser = await User.findOne({ email });
        let user;

        if (!dbUser) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true,
            })
        } else {
            user = dbUser;
            user.google = true;
        }

        await user.save();

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            email, name, picture,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no valido',
        });
    }
};

module.exports = {
    login,
    googleSignIn,
};