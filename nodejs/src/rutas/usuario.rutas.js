'use strict'

// Importaciones
const express = require("express");
const usuarioControlador = require("../controladores/usuario.controlador");

// MIDDLEWARE
/*var authenticated = require("../middlewares/authenticated");*/

// RUTES
var api = express.Router();
    api.get('/obtenerUsuarios', usuarioControlador.obtenerUsuarios);
    api.post('/crearUsuario', usuarioControlador.crearUsuario);
    api.get('/obtenerUsuario/:idUsuario', usuarioControlador.obtenerUsuario);
    api.put('/editarUsuario/:idUsuario', usuarioControlador.editarUsuario);
    api.delete('/eliminarUsuario/:idUsuario', usuarioControlador.eliminarUsuario);
module.exports = api;