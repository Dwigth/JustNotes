"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const environment_1 = require("../../environment/environment");
const index_1 = require("./notas/index");
class ORMModule {
    constructor() {
        this.modules = [];
        this.seql = new sequelize_typescript_1.Sequelize(environment_1.environment.database);
        this.modules = this.modules.concat(index_1.MODULE_NOTES_CLASSES);
        this.seql.addModels(this.modules);
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.ORMModule = ORMModule;
