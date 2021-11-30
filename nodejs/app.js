'use strict'

//VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");

// IMPORTACION RUTAS
const usuario_ruta = require("./src/rutas/usuario.rutas");

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// CABECERAS
app.use(cors());

// CARGA DE RUTAS (ej:  localhost:3000/api/obtenerUsuarios ).
app.use('/api', usuario_ruta);

//EXPORTAR
module.exports = app;