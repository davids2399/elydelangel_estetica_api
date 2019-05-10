"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("./../controllers/indexController");
class IndexRoutes {
    constructor() {
        //Creamos nuestra propiedad de router
        this.router = express_1.Router();
        //llamamos a nuestra configuracion
        this.config();
    }
    config() {
        //Creamos una ruta inicial para nuestra app. Al iniciar  
        //Aqui hay de 2 sopas, o se pueden establecer las rutas directamente:
        //this.router.get('/',(req,res) => res.send('Hello'));
        //O se puede manejar a traves de un archivo aparte
        this.router.get('/', indexController_1.indexController.index);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const indexRoutes = new IndexRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = indexRoutes.router;
