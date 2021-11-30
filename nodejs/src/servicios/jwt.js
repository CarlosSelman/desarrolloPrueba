'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = '@SmSopesa';

exports.createToken = function (usuario){
    var payload = {

        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        tel: usuario.tel,
        rol: usuario.rol,
        estado: usuario.estado,
        usuario: usuario.usuario,
        
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()

    }
    return jwt.encode(payload,secret);
}