"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_controller_1 = require("./controllers/server.controller");
class App {
    constructor() {
        const server = new server_controller_1.ServerController();
        server.Start();
        server.logs();
    }
}
const app = new App();
