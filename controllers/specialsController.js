"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//importamos las queries necesarias
const queries_1 = require("../queries");
const promise_mysql_1 = __importDefault(require("promise-mysql"));
//Aqui es donde traemos todo nuestra informacion de la DB
const database_1 = __importStar(require("../database"));
class SpecialsController {
    //Ya que tenemos que declarar los tipos de variables que estamos obteniendo, utilizamos la libreria de express para declararlos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Aqui las cosas se pusieron dificiles....
            //Primeramente creamos nuestra conexion con nuestra query indicada
            var query = database_1.connection.query(queries_1.specialsQuery);
            //Y creamos nuestro arreglo de usuarios
            var specials = [];
            //Ya que el metodo pool no tiene esta funcion , generamos una tipo connection
            query
                .on('error', function (err) {
                //En caso de haber un error...
                if (err)
                    throw err;
                res.json('Error ocurred when retriving data ' + err);
            })
                .on('result', function (row) {
                //La funcion principal de este metodo esta aqui
                //por cada "row" o fila, pausamos la query
                database_1.connection.pause();
                //Y se los asignamos al usuario
                var special = {
                    id: row['id'],
                    name: row['name'],
                    description: row['description'],
                    tag: row['tag'],
                    img: row['img'],
                    initial_date: row['initial_dateT'],
                    end_date: row['end_dateT']
                };
                //Empujamos nuestra fila al arreglo de usuarios
                specials.push(special);
                //Y continuamos con la query
                database_1.connection.resume();
            })
                .on('end', function () {
                //Creamos nuestra variable result, la cual sera la que se convertira en nuestra respuesta JSON
                var result;
                //Si obtenemos mas de 1 resultado, regresamos verdadero 
                if (specials.length > 0) {
                    result = { result: true, data: specials };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false, data: [] };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Obtenemos el id 
            const { id } = req.params;
            //Creamos nuestra query
            var query = database_1.connection.query(queries_1.specialQuery + ' WHERE id = ?', [id]);
            //Y creamos nuestra variable donde almacenaremos al objeto seleccionado
            var special;
            //Ya que el metodo pool no tiene esta funcion , generamos una tipo connection
            query
                .on('error', function (err) {
                //En caso de haber un error...
                if (err)
                    throw err;
                res.json('Error ocurred when retriving data ' + err);
            })
                .on('result', function (row) {
                //La funcion principal de este metodo esta aqui
                //por cada "row" o fila, pausamos la query
                database_1.connection.pause();
                //Asignamos los valores del objeto
                special = {
                    id: row['id'],
                    name: row['name'],
                    description: row['description'],
                    tag: row['tag'],
                    img: row['img'],
                    initial_date: row['initial_date'],
                    end_date: row['end_date']
                };
                //Y continuamos con la query
                database_1.connection.resume();
            })
                .on('end', function () {
                //Generamos nuestra variable que se convertira en nuestro JSON
                var result;
                //Si nuesto objeto no se define o esta vacio...
                if (special == undefined || special == null) {
                    //Devolvemos que nuestra busqueda no arrojo resultados
                    result = { result: false, data: {} };
                }
                else {
                    //caso contrario, regresamos verdadero y nuestro objeto 
                    result = { result: true, data: special };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            });
        });
    }
    //Creamos nuestro metodo Async, para que no tengamos que esperar y poder aprovechar los recursos
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var that = this;
            //Obtenemos la password
            const { name, description, tag, img, initial_date, end_date } = req.body;
            var special = {
                name: name,
                description: description,
                tag: tag,
                img: 'haircut.jpg'
            };
            //SELECT STR_TO_DATE('10/5/2019', '%m/%d/%Y')
            //convertimos nuestro objeto en una query
            var queryuser = database_1.connection.escape(special);
            queryuser += ',`initial_date` = STR_TO_DATE("' + initial_date + '", "%d/%m/%Y")';
            queryuser += ',`end_date` = STR_TO_DATE("' + end_date + '", "%d/%m/%Y")';
            console.log(queryuser);
            var result;
            //Y hacemos nuestra query tipo pool
            database_1.default.query('INSERT INTO t_specials  SET ' + queryuser, function (error, results, fields) {
                //En caso de tener un error, mandamos el error
                if (error) {
                    res.json('No special was added ' + error);
                    throw error;
                }
                //Ya que en un insert no nos interesa el dato, solamente preguntamos por las filas afectadas
                //En caso de ser mas de una, devolvemos que nuestra consulta fue verdadera
                if (results.affectedRows > 0) {
                    result = { result: true };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false };
                }
                return res.json(result);
            })
                //En caso de haber otro tipo de error
                .catch(function (err) {
                res.json({
                    result: false,
                    data: {
                        code: err.code,
                        error: err.errno,
                        state: err.sqlState
                    }
                });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Obtenemos la id a partir de los parametros
            const { id } = req.params;
            //Generamos nuestra query
            var query = promise_mysql_1.default.format('DELETE FROM t_specials WHERE id= ?', [id]);
            var result = yield database_1.default.query(query, function (error, results, fields) {
                //En caso de haber un error
                if (error) {
                    res.json('No special was changed' + error);
                    throw error;
                }
                var result;
                //Ya que en un delete no nos interesa el dato, solamente preguntamos por las filas afectadas
                //En caso de ser mas de una, devolvemos que nuestra consulta fue verdadera
                if (results.affectedRows > 0) {
                    result = { result: true };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            })
                //En caso de que ocurra otro tipo de error
                .catch(function (err) {
                res.json({
                    result: false,
                    data: {
                        code: err.code,
                        error: err.errno,
                        state: err.sqlState
                    }
                });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //obtenemos todos los tipos de valores esperados
            const { id } = req.params;
            const { name, description, tag, img, initial_date, end_date } = req.body;
            //Creamos nuestro objeto con sus valores
            var user = {
                name: name,
                description: description,
                tag: tag,
                img: img,
                initial_date: initial_date,
                end_date: end_date,
            };
            //Y le damos forma a nuestra query con el objeto
            var query = promise_mysql_1.default.format('UPDATE t_specials SET ? WHERE id= ?', [user, id]);
            database_1.default.query(query, function (error, results, fields) {
                //En caso de haber un error
                if (error) {
                    res.json('No special was changed' + error);
                    throw error;
                }
                var result;
                //Ya que en un update no nos interesa el dato, solamente preguntamos por las filas afectadas
                //En caso de ser mas de una, devolvemos que nuestra consulta fue verdadera
                if (results.affectedRows > 0) {
                    result = { result: true };
                }
                else {
                    //caso contrario, regresamos falso 
                    result = { result: false };
                }
                //Regresamos los resultados de la busqueda
                return res.json(result);
            })
                //En caso de obtener otro tipo de error
                .catch(function (err) {
                res.json({
                    result: false,
                    data: {
                        code: err.code,
                        error: err.errno,
                        state: err.sqlState
                    }
                });
            });
        });
    }
}
//Se exporta toda la clase para poder utilizar todos estos metodos
exports.specialsController = new SpecialsController();
