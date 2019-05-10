"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Creamos todas nuestras posibles rutas
        //obtiene lista de usuarios
        this.router.get('/', usersController_1.usersController.list);
        //obtiene un solo usuario
        this.router.get('/:id', usersController_1.usersController.getOne);
        //crea uno solo usuario
        this.router.post('/', usersController_1.usersController.create);
        //elimina uno solo usuario
        this.router.delete('/:id', usersController_1.usersController.delete);
        //actualiza un solo usuario
        this.router.put('/:id', usersController_1.usersController.update);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const usersRoutes = new UsersRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = usersRoutes.router;
