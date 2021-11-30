'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = '@SmSopesa';

exports.ensureAuth = function (req,res,next){
    if(!req.headers.authorization){
        return res.status(404).send({ report: 'No está autorizado para hacer esta acción'});
    }

    var token = req.headers.authorization.replace(/['"']+/g,'');

    try{
        var payload = jwt.decode(token,secret);
        
        if(payload.exp <= moment().unix()){
            return res.status(200).send({ report: 'El token expiró'})
        }
        
    }catch(err){
        return res.status(404).send({ report: 'El token no es válido'});
    }

    req.usuario = payload;
    next();
}