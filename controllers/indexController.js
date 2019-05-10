"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    //Ruta principal al acceder al api
    index(req, res) {
        res.send('');
    }
}
//Se exporta toda la clase para poder utilizar todos estos metodos
exports.indexController = new IndexController();
