"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialsController_1 = require("../controllers/specialsController");
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Creamos todas nuestras posibles rutas
        //obtiene lista de usuarios
        this.router.get('/', specialsController_1.specialsController.list);
        //obtiene un solo usuario
        this.router.get('/:id', specialsController_1.specialsController.getOne);
        //crea uno solo usuario
        this.router.post('/', specialsController_1.specialsController.create);
        //elimina uno solo usuario
        this.router.delete('/:id', specialsController_1.specialsController.delete);
        //actualiza un solo usuario
        this.router.put('/:id', specialsController_1.specialsController.update);
    }
}
//Creamos nuestra constante, que sera la que genere un objeto
const usersRoutes = new UsersRoutes();
//Y la exportamos, pero solamente nuestras rutas
exports.default = usersRoutes.router;
