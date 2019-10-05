import { ServerController } from "./controllers/server.controller";

class App {
    constructor() {
        const server = new ServerController();
        server.Start();
        server.logs();
    }
}

const app = new App();