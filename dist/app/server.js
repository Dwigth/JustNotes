"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Este archivo es el punto de partida del servidor.
 * utiliza el middleware cors para lidiar con las situaciones de 'Cross-origin Resource Sharing'.
 * Se carga el archivo de config para poder acceder a las variables de configuración del servidor y
 * de la base de datos.
 * Se importa el bootstrapRoutes para inicializar las rutas al pasar como argumento el objeto express().
 * Helmet es una colección de 14 funciones de middleware que configuran los headers en las respuestas HTTP.
 * Más información del uso de Helmet middlewares: https://helmetjs.github.io/docs/
 */
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const request_ip_1 = __importDefault(require("request-ip"));
const config_dev_1 = require("../config/config.dev");
const init_routes_module_1 = require("./routes/init-routes.module");
const orm_module_1 = __importDefault(require("./orm/orm.module"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
//declaración de la aplicación
const app = express_1.default();
//inicializador de rutas
// import UserAgent from 'express-useragent';
const orm = new orm_module_1.default();
//middlewares que se ejecutarán antes de las peticiones
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(request_ip_1.default.mw());
// app.use(UserAgent.express());
app.use(compression_1.default());
init_routes_module_1.bootstrapRoutes(app);
// const server = https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
// }, app);
const server = http_1.default.createServer(app);
exports.io = socket_io_1.default(server);
server.listen(config_dev_1.config.PORT);
console.log("Puerto ", config_dev_1.config.PORT);
console.log("Modo: ", (process.env.NODE_ENV != undefined) ? 'Producción' : 'Desarrollo');
