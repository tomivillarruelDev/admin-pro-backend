const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    //defincion del esquema de usuario
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId, //indica que el campo user es una referencia a otro objeto de tipo ObjectId
        ref: 'User', //indica que la referencia es al modelo "User"
    },
});

HospitalSchema.method(
    'toJSON',
    function () //metodo toJSON para modificar la respuesta que se envia al cliente
    {
        const { __v, ...object } = this.toObject(); //extraemos los campos que no queremos que se muestren en la respuesta

        return object;
    }
);

module.exports = model('Hospital', HospitalSchema); //exportamos el modelo de usuario con el nombre "User" y el esquema HospitalSchema
