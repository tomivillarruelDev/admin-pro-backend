const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, resp) => {
    const from = Number(req.query.from) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google').skip(from).limit(5),
        User.countDocuments(),
    ]);

    resp.json({
        ok: true,
        users,
        total,
    });
};

const createUser = async (req, resp = response) => {
    const { password, email } = req.body;

    try {
        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return resp.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado',
            });
        }

        const user = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //genera un salt para encriptar la contraseña
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id);

        resp.json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs',
        });
    }
};

const updateUser = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const dbUser = await User.findById(uid);

        if (!dbUser) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con las credenciales especificadas',
            });
        }

        const { password, google, email, ...fields } = req.body;

        if (dbUser.email !== email) {
            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con el mismo email',
                });
            }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {
            new: true,
        }); // Buscalo y actualizalo

        res.json({
            ok: true,
            user: updatedUser,
        });
    } catch (error) {
        console.error(error); // Esto te ayudará a ver el error en la consola
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
        });
    }
};

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const dbUser = await User.findById(uid);

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con las credenciales especificadas',
            });
        }

        await User.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario Eliminado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...',
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
