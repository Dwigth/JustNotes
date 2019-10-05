
import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';
import { environment } from "../../environment/environment.pro";
import { MODULE_NOTES_CLASSES } from "./notas/index";

export class ORMModule {
    private static _instance: ORMModule;
    public seql: Sequelize;
    private modules: string[] = [];

    constructor() {
        this.seql = new Sequelize(environment.database);
        this.modules = this.modules.concat(
            MODULE_NOTES_CLASSES
        );
        this.seql.addModels(this.modules);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
