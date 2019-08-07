"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db_dev_1 = require("../../config/db.dev");
const index_1 = require("./notas/index");
class ORM {
    constructor() {
        this.modules = [];
        this.config = db_dev_1._CONFIG;
        this.seql = new sequelize_typescript_1.Sequelize(this.config);
        this.modules = this.modules.concat(index_1.MODULE_NOTES_CLASSES);
        this.seql.addModels(this.modules);
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.default = ORM;
