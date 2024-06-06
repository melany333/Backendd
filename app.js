const express = require('express');
const { dbConnection } = require('./database/config');

const app = express()
require('dotenv').config(); // importacion de dotenv

//lectura y parseo del body
app.use(express.json());

//coneccion a la base de datos
dbConnection();

//directorio publico
app.use(express.static('public'))


app.use("/auth",require('./routes/auth'))

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});