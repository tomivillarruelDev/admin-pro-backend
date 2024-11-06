const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    //defincion del esquema de usuario
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UserSchema.method(
    'toJSON',
    function () //metodo toJSON para modificar la respuesta que se envia al cliente
    {
        const { __v, _id, password, ...object } = this.toObject(); //extraemos los campos que no queremos que se muestren en la respuesta

        object.uid = _id; //cambiamos el nombre del campo _id por uid

        return object;
    }
);

module.exports = model('User', UserSchema); //exportamos el modelo de usuario con el nombre "User" y el esquema UserSchema
