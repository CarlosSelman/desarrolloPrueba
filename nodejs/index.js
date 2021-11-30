'use strict'

const mongoose = require("mongoose"); //Conexión a mongoose
const app = require('./app')

//Conexión a mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/desarrolloPrueba', { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    
console.log('Se encuentra conectado(a) a la base de datos'); //mensaje en consola
    
    //Conección al puerto 3000 levantando el servidor
    app.listen(3000, function () {
        console.log('El servidor está corriendo en el puerto: 3000'); //mensaje en consola
    });

}).catch(err => console.log(err)); //mensaje de error si no se logra conectar a la DB