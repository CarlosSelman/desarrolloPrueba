'use strict'

const usuarioModelo = require("../modelos/usuario.modelo");
const Usuario = require("../modelos/usuario.modelo");
const jwt = require('../servicios/jwt');
const bcrypt = require("bcrypt-nodejs");

function obtenerUsuarios(req,res){
    usuarioModelo.find((err,usuariosEncontrados)=>{
        if(err) return res.status(404).send({report: 'Error al encontrar los usuarios'});
            return res.status(200).send(usuariosEncontrados);
    })
}


function crearUsuario(req,res){
    var usuarioModel = new Usuario();
    var params = req.body;

    if (params.nombres && params.apellidos) {
        usuarioModel.nombres = params.nombres;
        usuarioModel.apellidos = params.apellidos;
        usuarioModel.fechaNacimiento = params.fechaNacimiento;
        usuarioModel.estadoCivil = params.estadoCivil;
        usuarioModel.gradoAcademico = params.gradoAcademico;
        usuarioModel.direccion = params.direccion;

        Usuario.find({
            $or: [
                { usuario: usuarioModel.nombres },
                { correo: usuarioModel.apellidos }
            ]
        }).exec((err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })

            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El usuario ya existe' })
            } else {

                usuarioModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })

                        //Guardando el usuario
                        if (usuarioGuardado) {
                            res.status(200).send(usuarioGuardado)
                            console.log(params); 
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el Usuario' })
                        }
                    })
                
            }
        })
    }
}


function obtenerUsuario(req, res) {
    var idUsuario = req.params.idUsuario
    
    Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del Usuario' })
        console.log(usuarioEncontrado.correo);
        return res.status(200).send({ usuarioEncontrado })
    })
}

function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var params = req.body;

    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar al Usuario' });
        
        return res.status(200).send({ usuarioActualizado });
    })

    
}

function eliminarUsuario(req, res) {
    const idUsuario = req.params.idUsuario;

    Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!usuarioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el usuario.' });

        return res.status(200).send({ usuarioEliminado });
    })
}



module.exports = {
   
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuario,
    editarUsuario,
    eliminarUsuario,
    
}