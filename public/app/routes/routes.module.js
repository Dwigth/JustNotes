"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//parsers
const body_parser_1 = __importDefault(require("body-parser"));
const notas_routes_1 = require("./notas/notas.routes");
const etiquetas_routes_1 = require("./notas/etiquetas.routes");
const server_controller_1 = require("../controllers/server.controller");
const index_routes_1 = require("./main/index.routes");
const routes = [
    index_routes_1.main_router,
    notas_routes_1.notas_router,
    etiquetas_routes_1.etiquetas_router
];
class RoutesModule {
    constructor() {
        this.bootstrapRoutes(server_controller_1.EXPRESS_APP);
    }
    bootstrapRoutes(app) {
        app.use(body_parser_1.default.json()); // para application/json
        app.use(body_parser_1.default.urlencoded({ extended: true })); // para application/x-www-form-urlencoded
        app.use(routes);
        app.use('*', (req, res) => {
            res.status(404).send();
        });
    }
}
exports.RoutesModule = RoutesModule;
