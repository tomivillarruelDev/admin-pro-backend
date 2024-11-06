require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config'); //exportamos la funcion dbConnection. La desestructuiracion nos permite en un futuro importar mas funciones u objetos de un mismo archivo

//crear el servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Public directory
app.use(express.static('public')); //middleware para acceder a la carpeta publica

app.use(express.json()); //middleware para parsear los datos que vienen en formato JSON
//Base de datos
dbConnection();

//Rutas

app.use('/api/users', require('./routes/users')); //importamos el archivo de rutas de usuarios
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto ' + process.env.PORT);
});
//Nc9XngQ2zJIkyFQj
