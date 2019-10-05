//parsers
import bodyParser from "body-parser";
import { notas_router } from "./notas/notas.routes";
//interfaces
import { Application, Request, Response } from 'express';
import { etiquetas_router } from "./notas/etiquetas.routes";
import { EXPRESS_APP } from "../controllers/server.controller";
import { main_router } from "./main/index.routes";
const routes = [
    main_router,
    notas_router,
    etiquetas_router
];

export class RoutesModule {
    constructor() {
        this.bootstrapRoutes(EXPRESS_APP);
    }
    private bootstrapRoutes(app: Application) {
        app.use(bodyParser.json()); // para application/json
        app.use(bodyParser.urlencoded({ extended: true })); // para application/x-www-form-urlencoded
        app.use(routes);

        app.use('*', (req: Request, res: Response) => {
            res.status(404).send();
        });
    }
}