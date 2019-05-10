import { Router } from 'express';
import { specialsController }  from '../controllers/specialsController';

class UsersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        //Creamos todas nuestras posibles rutas
        //obtiene lista de usuarios
        this.router.get('/', specialsController.list);
        //obtiene un solo usuario
        this.router.get('/:id', specialsController.getOne);
        //crea uno solo usuario
        this.router.post('/', specialsController.create);
        //elimina uno solo usuario
        this.router.delete('/:id',specialsController.delete);
        //actualiza un solo usuario
        this.router.put('/:id', specialsController.update);
    }

}

//Creamos nuestra constante, que sera la que genere un objeto
const usersRoutes = new UsersRoutes();

//Y la exportamos, pero solamente nuestras rutas
export default usersRoutes.router;