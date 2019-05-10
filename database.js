"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos la librearia de promise mysql
const promise_mysql_1 = __importDefault(require("promise-mysql"));
//E importamos las llaves de nuestra base de datos
const keys_1 = __importDefault(require("./keys"));
//Metodo ideal para produccion, se manda la configuracion pre-establecida en un archivo
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
//El metodo get conection nos permitira poder mandar consultas y funciones de mysql
pool.getConnection()
    .then(connection => {
    //ya que funciona a traves de promesas, manda la coneccion una vez obtenida
    pool.releaseConnection(connection);
    //en caso de funcionar manda el mensaje que la base de datos se encuentra funcional
    console.log('DB is connected');
});
//Creamos una segunda conexion de tipo mysql
var mysql2 = require('mysql');
var var2 = mysql2.createConnection(keys_1.default.database);
var2.connect();
exports.default = pool;
exports.connection = var2;
