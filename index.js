"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Se instala la dependencia de express
const express_1 = __importDefault(require("express"));
//Igualmente se instala la dependencia de morgan y cors 
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//Rutas que manejara el servidor
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const specialsRoutes_1 = __importDefault(require("./routes/specialsRoutes"));
//Se crea una clase que sera la que realize la logia de nuestro servidor 
class Server {
    //Al crear la clase se ejecuta el constructor
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //Este metodo se encarga de configurar correctamente las propiedades de app: Application
    config() {
        try {
            //process.env.PORT: sirve para detectar que puerto es el que funciona con nuestro servidor de la nube
            //3000: es el puerto que nosotros estipulamos para que funcione nuestro servidor
            this.app.set('port', process.env.PORT || 3000);
            /* Morgan nos sirve para poder ver en consola el tipo de peticion que los usuarios hacen al servidor*/
            this.app.use(morgan_1.default('dev'));
            //Con esto angular podra pedir los datos a nuestro server
            this.app.use(cors_1.default());
            //Este nos permite poder aceptar datos de tipo json de nuestro server
            this.app.use(express_1.default.json());
            //en caso de que queramos enviar desde un formato HTML
            this.app.use(express_1.default.urlencoded({ extended: false }));
        }
        catch (e) {
            console.log(e);
        }
    }
    //Este metodo funciona para obtener las rutas de nuestro servidor
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/users', usersRoutes_1.default);
        this.app.use('/api/specials', specialsRoutes_1.default);
    }
    //Este metodo sera el que inicialize nuestro servidor
    start() {
        //Su funcion es escuchar en el puerto definido
        this.app.listen(this.app.get('port'), () => {
            //Aqui empieza nuestro servidor
            console.log('Server on port ' + this.app.get('port'));
        });
    }
}
//Se utiliza esta funcion para generar la clase y que devuelva un objeto
const server = new Server();
server.start();
