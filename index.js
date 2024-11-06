require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Public directory
app.use(express.static('public'));

app.use(express.json());

//Base de datos
dbConnection();

//Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto ' + process.env.PORT);
});
