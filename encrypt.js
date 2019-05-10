"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos la libreria de bcrypt
var bcrypt = require('bcrypt');
//Exportamos una funcion que sera la que se encargue de encriptar las contraseñas
exports.cryptPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return callback(err);
        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
};
//Exportamos una funcion que sera la que se encargue de comparar las contraseñas encriptadas
exports.comparePassword = function (plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};
