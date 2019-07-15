/**
 * @description Este archivo es el punto de partida del servidor.
 * utiliza el middleware cors para lidiar con las situaciones de 'Cross-origin Resource Sharing'.
 * Se carga el archivo de config para poder acceder a las variables de configuración del servidor y
 * de la base de datos.
 * Se importa el bootstrapRoutes para inicializar las rutas al pasar como argumento el objeto express().
 * Helmet es una colección de 14 funciones de middleware que configuran los headers en las respuestas HTTP.
 * Más información del uso de Helmet middlewares: https://helmetjs.github.io/docs/
 */
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import requestIp from 'request-ip';
import { config } from '../config/config.dev';
import { bootstrapRoutes } from './routes/init-routes.module';
import ORM from './orm/orm.module';
import sokectIO from 'socket.io';
import http from 'http';
import https from 'https';
import fs from 'fs';


//declaración de la aplicación
const app = express();
//inicializador de rutas
// import UserAgent from 'express-useragent';


const orm = new ORM();
//middlewares que se ejecutarán antes de las peticiones
app.use(cors());
app.use(helmet());
app.use(requestIp.mw());
// app.use(UserAgent.express());
app.use(compression());
bootstrapRoutes(app);

// const server = https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
// }, app);

const server = http.createServer(app);

export const io = sokectIO(server);

server.listen(config.PORT);
console.log("Puerto ", config.PORT);
console.log("Modo: ", (process.env.NODE_ENV != undefined) ? 'Producción' : 'Desarrollo');