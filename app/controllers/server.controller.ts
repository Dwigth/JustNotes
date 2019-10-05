import express, { Application } from 'express';
import { ORMModule } from '../orm/orm.module';
import { RoutesModule } from '../routes/routes.module';
import { environment } from '../../environment/environment';
import hbs from 'hbs';

import http from 'http';

// Declaración global de la aplicación de express
export let EXPRESS_APP: Application;
// Declaración global del Object Relational Mapping
export let ORM: any;
// Declaración global del servidor http/https
export let SERVER: any;

export class ServerController {

    constructor() { }

    private BootstrapDatabase() {
        ORM = new ORMModule();
    }

    private BootstrapWeb() {

        const dir = __dirname.substring(0, (__dirname.indexOf('public')));
        EXPRESS_APP = express();
        EXPRESS_APP.use('/assets', express.static(dir + '/assets'));
        EXPRESS_APP.set('view engine', 'hbs');
        const routes = new RoutesModule();

    }

    public Start() {
        this.BootstrapWeb();
        this.BootstrapDatabase();

        SERVER = http.createServer(EXPRESS_APP);
        SERVER.listen(environment.PORT);
    }

    public logs() {
        console.log('Todo bien');
    }
}