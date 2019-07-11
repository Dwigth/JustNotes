
//parsers
import bodyParser from "body-parser";
import { notas_router } from "./notas/notas.routes";
//interfaces
import { Application, Request, Response } from 'express';
const routes = [
    notas_router
];
export function bootstrapRoutes(app: Application) {
    app.use(bodyParser.json()); // para application/json
    app.use(bodyParser.urlencoded({ extended: true })); // para application/x-www-form-urlencoded
    app.use(routes);

    app.use('*', (req: Request, res: Response) => {
        res.status(404).send();
    });
}
