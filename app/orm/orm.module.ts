
import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';
import { environment } from "../../environment/environment";
import { MODULE_NOTES_CLASSES } from "./notas/index";
import { COMMON_MODULES } from './common';

export class ORMModule {
    private static _instance: ORMModule;
    public seql: Sequelize;
    private modules: string[] = [];

    constructor() {
        console.log(environment.database)
        this.seql = new Sequelize(environment.database);
        this.modules = this.modules.concat(
            MODULE_NOTES_CLASSES,
            COMMON_MODULES
        );
        this.seql.addModels(this.modules);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
