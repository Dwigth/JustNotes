"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orm_module_1 = require("../orm/orm.module");
const routes_module_1 = require("../routes/routes.module");
const environment_1 = require("../../environment/environment");
const http_1 = __importDefault(require("http"));
class ServerController {
    constructor() { }
    BootstrapDatabase() {
        exports.ORM = new orm_module_1.ORMModule();
    }
    BootstrapWeb() {
        const dir = __dirname.substring(0, (__dirname.indexOf('public')));
        exports.EXPRESS_APP = express_1.default();
        exports.EXPRESS_APP.use('/assets', express_1.default.static(dir + '/assets'));
        exports.EXPRESS_APP.set('view engine', 'hbs');
        const routes = new routes_module_1.RoutesModule();
    }
    Start() {
        this.BootstrapWeb();
        this.BootstrapDatabase();
        exports.SERVER = http_1.default.createServer(exports.EXPRESS_APP);
        exports.SERVER.listen(environment_1.environment.PORT);
    }
    logs() {
        console.log('Todo bien');
    }
}
exports.ServerController = ServerController;
