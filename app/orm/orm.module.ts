
import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';
import { _CONFIG } from "../../config/db.dev";
import { MODULE_NOTES_CLASSES } from "./notas/index";

export default class ORM {
    private static _instance: ORM;
    public seql: Sequelize;
    public config: ISequelizeConfig;
    private modules: string[] = [];

    constructor() {
        this.config = _CONFIG;
        this.seql = new Sequelize(this.config);
        this.modules = this.modules.concat(
            MODULE_NOTES_CLASSES
        );
        this.seql.addModels(this.modules);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
